export const TAU = 2 * Math.PI;
export const degreesToRadians = degrees => degrees / 180 * Math.PI;
export const radiansToDegrees = radians => radians * 180 / Math.PI;
export function trigValue(name, x) {
  const s = Math.sin(x), c = Math.cos(x);
  if (name === 'sin') return Math.abs(s) < 1e-12 ? 0 : s;
  if (name === 'cos') return Math.abs(c) < 1e-12 ? 0 : c;
  if (name === 'tan') return Math.abs(c) < 1e-12 ? null : s / c;
  if (name === 'cot') return Math.abs(s) < 1e-12 ? null : c / s;
  throw new Error('Neznámá funkce');
}
export function transformedValue(name, x, a, b, c, d) {
  const value = trigValue(name, b * (x - c));
  return value === null ? null : a * value + d;
}
export function graphPoles(name, b, c, min = -TAU, max = TAU) {
  if (!['tan', 'cot'].includes(name) || b === 0) return [];
  const phase = name === 'tan' ? Math.PI / 2 : 0;
  const low = Math.min(b * (min - c), b * (max - c));
  const high = Math.max(b * (min - c), b * (max - c));
  const poles = [];
  for (let k = Math.ceil((low - phase) / Math.PI); k <= Math.floor((high - phase) / Math.PI); k++) poles.push(c + (phase + k * Math.PI) / b);
  return poles.sort((x,y) => x-y);
}
export function graphSegments(name, a, b, c, d, min = -TAU, max = TAU, count = 1000) {
  const poles = graphPoles(name, b, c, min, max);
  const segments = [];
  let segment = [], previous = min;
  for (let i = 0; i <= count; i++) {
    const x = min + (max - min) * i / count;
    const y = transformedValue(name, x, a, b, c, d);
    const crosses = i > 0 && poles.some(p => p >= previous - 1e-10 && p <= x + 1e-10);
    if (crosses || y === null || !Number.isFinite(y)) { if (segment.length) segments.push(segment); segment = []; }
    if (y !== null && Number.isFinite(y)) segment.push([x,y]);
    previous = x;
  }
  if (segment.length) segments.push(segment);
  return segments;
}
export function solveTriangle(a, b, gammaDegrees) {
  if (![a,b,gammaDegrees].every(Number.isFinite) || a <= 0 || b <= 0 || gammaDegrees <= 0 || gammaDegrees >= 180) throw new Error('Strany a, b musí být kladné a úhel γ musí ležet mezi 0° a 180°.');
  const gamma = degreesToRadians(gammaDegrees);
  const scale = Math.max(a,b), A=a/scale, B=b/scale;
  const C = Math.sqrt((A - B) ** 2 + 4 * A * B * Math.sin(gamma / 2) ** 2);
  const c = C * scale;
  const alpha = Math.acos(Math.max(-1,Math.min(1,(B*B+C*C-A*A)/(2*B*C))));
  const beta = Math.PI - gamma - alpha;
  if (beta <= 0 || ![c,alpha,beta,a/Math.sin(alpha)].every(Number.isFinite) || c <= 0) throw new Error('Příliš krajní hodnoty pro spolehlivý výpočet. Zvol běžné délky a méně plochý trojúhelník.');
  return {a,b,c,alpha:radiansToDegrees(alpha),beta:radiansToDegrees(beta),gamma:gammaDegrees,ratio:a/Math.sin(alpha)};
}
export const specialAngles = [
  [0,'0','0','1','0','nedefinováno'],[30,'π/6','1/2','√3/2','√3/3','√3'],[45,'π/4','√2/2','√2/2','1','1'],[60,'π/3','√3/2','1/2','√3','√3/3'],[90,'π/2','1','0','nedefinováno','0'],[120,'2π/3','√3/2','−1/2','−√3','−√3/3'],[135,'3π/4','√2/2','−√2/2','−1','−1'],[150,'5π/6','1/2','−√3/2','−√3/3','−√3'],[180,'π','0','−1','0','nedefinováno'],[210,'7π/6','−1/2','−√3/2','√3/3','√3'],[225,'5π/4','−√2/2','−√2/2','1','1'],[240,'4π/3','−√3/2','−1/2','√3','√3/3'],[270,'3π/2','−1','0','nedefinováno','0'],[300,'5π/3','−√3/2','1/2','−√3','−√3/3'],[315,'7π/4','−√2/2','√2/2','−1','−1'],[330,'11π/6','−1/2','√3/2','−√3/3','−√3'],[360,'2π','0','1','0','nedefinováno']
];
