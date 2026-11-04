export function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}
export function pragueToday() {
  const parts = new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Prague',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
  return `${parts.find(p=>p.type==='year').value}-${parts.find(p=>p.type==='month').value}-${parts.find(p=>p.type==='day').value}`;
}
export function parseDate(key) { return new Date(`${key}T12:00:00`); }
export function calendarDays(year,month) {
  const first = new Date(year,month,1,12);
  const offset = (first.getDay()+6)%7;
  const count = Math.ceil((offset+new Date(year,month+1,0).getDate())/7)*7;
  return Array.from({length:count},(_,i)=>{
    const date = new Date(year,month,1-offset+i,12);
    return {key:dateKey(date),day:date.getDate(),inMonth:date.getMonth()===month};
  });
}
