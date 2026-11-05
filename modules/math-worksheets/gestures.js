/** Touch input stays inside the worksheet. Wheel, mouse and keyboard scrolling stay native. */
export function mountWorksheetGestures(viewport, {onTransform,onTap} = {}) {
  const pointers = new Map();
  let pan = null;
  let pinch = null;
  let moved = false;
  let suppressUntil = 0;
  let frame = 0;
  let velocity = {x:0,y:0};
  let lastMove = 0;
  let disposed = false;
  const now = () => performance.now();
  const setMode = value => { viewport.dataset.gesture = value; };
  const midpoint = (a,b) => ({x:(a.x+b.x)/2,y:(a.y+b.y)/2});
  const metrics = () => { const [a,b] = [...pointers.values()]; return {distance:Math.max(1,Math.hypot(a.x-b.x,a.y-b.y)),point:midpoint(a,b)}; };
  function cancelMotion() { if(frame)cancelAnimationFrame(frame);frame=0;velocity={x:0,y:0}; }
  function release(id) { try { if(viewport.hasPointerCapture(id))viewport.releasePointerCapture(id); } catch { /* Synthetic tests and cancelled native touches may already have released capture. */ } }
  function baseline(pointer) { pan={x:pointer.x,y:pointer.y,left:viewport.scrollLeft,top:viewport.scrollTop,lastX:pointer.x,lastY:pointer.y,time:now()};velocity={x:0,y:0}; }
  function down(event) {
    if(event.pointerType!=='touch' || disposed)return;
    event.preventDefault();
    cancelMotion();
    if(!pointers.size)moved=false;
    pointers.set(event.pointerId,{x:event.clientX,y:event.clientY,startX:event.clientX,startY:event.clientY,target:event.target});
    // Capture is safe because taps are resolved explicitly from their original printed target.
    try { viewport.setPointerCapture(event.pointerId); } catch { /* Real touch capture is available; synthetic pointer tests need no capture. */ }
    if(pointers.size===1){baseline(pointers.get(event.pointerId));pinch=null;setMode('idle');}
    else{moved=true;pinch=metrics();pan=null;setMode('pinch');}
  }
  function move(event) {
    const pointer=pointers.get(event.pointerId);
    if(!pointer || disposed)return;
    event.preventDefault();
    pointer.x=event.clientX;pointer.y=event.clientY;
    if(pointers.size>=2){
      const next=metrics();
      if(pinch)onTransform?.({factor:next.distance/pinch.distance,from:pinch.point,to:next.point});
      pinch=next;moved=true;velocity={x:0,y:0};setMode('pinch');lastMove=now();
      return;
    }
    if(!pan)baseline(pointer);
    if(!moved && Math.hypot(pointer.x-pan.x,pointer.y-pan.y)<8)return;
    moved=true;setMode('pan');
    const time=now(),elapsed=Math.max(1,time-pan.time);
    const oldLeft=viewport.scrollLeft,oldTop=viewport.scrollTop;
    viewport.scrollLeft=pan.left-(pointer.x-pan.x);
    viewport.scrollTop=pan.top-(pointer.y-pan.y);
    const deltaX=viewport.scrollLeft-oldLeft,deltaY=viewport.scrollTop-oldTop;
    const filtered = elapsed>80 ? 1 : .55;
    velocity.x=velocity.x*(1-filtered)+deltaX/elapsed*filtered;
    velocity.y=velocity.y*(1-filtered)+deltaY/elapsed*filtered;
    pan.lastX=pointer.x;pan.lastY=pointer.y;pan.time=time;lastMove=time;
  }
  function momentum() {
    if(disposed || now()-lastMove>90 || matchMedia('(prefers-reduced-motion: reduce)').matches || Math.hypot(velocity.x,velocity.y)<.06)return;
    let previous=now();
    const tick=time=>{
      frame=0;
      if(disposed || pointers.size)return;
      const elapsed=Math.min(32,time-previous);previous=time;
      const left=viewport.scrollLeft,top=viewport.scrollTop;
      viewport.scrollLeft+=velocity.x*elapsed;viewport.scrollTop+=velocity.y*elapsed;
      if(Math.abs(viewport.scrollLeft-left)<.1)velocity.x=0;
      if(Math.abs(viewport.scrollTop-top)<.1)velocity.y=0;
      const friction=Math.pow(.94,elapsed/16);velocity.x*=friction;velocity.y*=friction;
      if(Math.hypot(velocity.x,velocity.y)>.025)frame=requestAnimationFrame(tick);
    };
    frame=requestAnimationFrame(tick);
  }
  function finish(event,cancelled=false) {
    const pointer=pointers.get(event.pointerId);
    if(!pointer)return;
    event.preventDefault();
    const tap=!cancelled && !moved && pointers.size===1 && Math.hypot(event.clientX-pointer.startX,event.clientY-pointer.startY)<8;
    pointers.delete(event.pointerId);release(event.pointerId);
    suppressUntil=now()+850;
    if(pointers.size>=2){pinch=metrics();pan=null;setMode('pinch');}
    else if(pointers.size===1){baseline([...pointers.values()][0]);pinch=null;moved=true;setMode('pan');}
    else{
      pan=null;pinch=null;setMode('idle');
      if(tap){cancelMotion();onTap?.({x:event.clientX,y:event.clientY,target:pointer.target});}
      else if(!cancelled)momentum();
      else cancelMotion();
    }
  }
  const up = event => finish(event,false);
  const cancel = event => finish(event,true);
  function click(event) {
    // Keyboard activation has detail 0. Genuine mouse input is never swallowed after a touch.
    if(event.detail===0 || event.pointerType==='mouse')return;
    if(now()<suppressUntil){event.preventDefault();event.stopImmediatePropagation();}
  }
  const lost = event => {if(pointers.has(event.pointerId))finish(event,true);};
  viewport.addEventListener('pointerdown',down,{passive:false});
  viewport.addEventListener('pointermove',move,{passive:false});
  viewport.addEventListener('pointerup',up,{passive:false});
  viewport.addEventListener('pointercancel',cancel,{passive:false});
  viewport.addEventListener('lostpointercapture',lost);
  viewport.addEventListener('click',click,true);
  setMode('idle');
  return {
    cancelMotion,
    dispose(){disposed=true;cancelMotion();for(const id of pointers.keys())release(id);pointers.clear();setMode('idle');viewport.removeEventListener('pointerdown',down);viewport.removeEventListener('pointermove',move);viewport.removeEventListener('pointerup',up);viewport.removeEventListener('pointercancel',cancel);viewport.removeEventListener('lostpointercapture',lost);viewport.removeEventListener('click',click,true);},
  };
}
