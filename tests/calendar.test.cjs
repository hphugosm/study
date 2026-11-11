const test = require('node:test');
const assert = require('node:assert/strict');

test('November 2026 starts on Sunday in a Monday-first calendar and includes both school tests', async () => {
  const { calendarDays } = await import('../src/calendar.js');
  const { events, eventContext } = await import('../src/data.js');
  const days = calendarDays(2026, 10);
  assert.equal(days[0].key, '2026-10-26');
  assert.equal(days[6].key, '2026-11-01');
  assert.equal(days.filter(day => day.inMonth).length, 30);
  assert.equal(new Set(days.map(day => day.key)).size, days.length);
  const sameDay = events.filter(event => event.date === '2026-11-05');
  assert.equal(sameDay.length, 2);
  assert.deepEqual(sameDay.map(event => eventContext(event).subject.name).sort(), ['Biologie', 'Matematika']);
});

test('calendar handles leap February and year boundaries without missing or duplicate dates', async () => {
  const { calendarDays } = await import('../src/calendar.js');
  assert.equal(calendarDays(2028, 1).filter(day => day.inMonth).length, 29);
  assert.equal(calendarDays(2027, 1).filter(day => day.inMonth).length, 28);
  for (const [year, month] of [[2026, 11], [2027, 0], [2028, 1]]) {
    const days = calendarDays(year, month);
    assert.equal(days.length % 7, 0);
    for (let index = 1; index < days.length; index++) {
      const previous = new Date(`${days[index - 1].key}T12:00:00Z`);
      previous.setUTCDate(previous.getUTCDate() + 1);
      assert.equal(days[index].key, previous.toISOString().slice(0, 10));
    }
  }
});

test('study events resolve their units, school excursions stand alone and all dates are correct', async () => {
  const { subjects, units, events, eventContext, eventTypes } = await import('../src/data.js');
  for (const records of [subjects, units, events]) assert.equal(new Set(records.map(record => record.id)).size, records.length);
  for (const event of events) {
    const resolved = eventContext(event);
    if (event.unitId) {
      assert.ok(resolved.unit?.title, event.id);
      assert.ok(resolved.subject?.name, event.id);
    } else {
      assert.equal(resolved.unit, undefined, event.id);
      assert.equal(resolved.subject, undefined, event.id);
    }
    assert.match(event.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(Object.hasOwn(eventTypes, event.type), event.id);
  }
  assert.deepEqual(Object.fromEntries(events.map(({ id, date, type }) => [id, { date, type }])), {
    'biology-test': { date: '2026-11-05', type: 'test' },
    'math-test': { date: '2026-11-05', type: 'test' },
    'history-test': { date: '2026-11-09', type: 'test' },
    'power-plants-excursion': { date: '2026-11-12', type: 'excursion' },
    'law-test': { date: '2026-11-19', type: 'test' },
    'literature-assignment': { date: '2026-11-18', type: 'homework' },
  });
  const excursion = events.find(event => event.id === 'power-plants-excursion');
  assert.equal(excursion.allDay, true);
  assert.equal(excursion.unitId, undefined);
  const history = eventContext(events.find(event => event.id === 'history-test'));
  assert.equal(history.subject.id, 'history');
  assert.equal(history.unit.id, 'baroque');
  assert.equal(history.unit.materials.length, 1);
  assert.equal(history.unit.module, 'baroque');
});

test('confirmed Law test resolves its original and source aliases without deleting fallback preparation',async()=>{
 const {getEvent,events}=await import('../src/data.js');
 const original=getEvent('law-test');
 const source='4a1dfc8941791503106e8a3354cfb70f061bc2b5713825f53f08edb0cb5c25ed';
 assert.equal(getEvent('moodle-deadline-'+source),original);
 assert.equal(original.sourceAssignmentUnitId,'moodle-law-e34a26cc76ae3e441e97436d2360a95f');
 assert.equal(original.unitId,'law-unit-2');
 assert.equal(original.date,'2026-11-19');
 assert.equal(original.starts,undefined);
 assert.equal(events.length,6);
 assert.equal(getEvent('moodle-deadline-'+'f'.repeat(64)),undefined);
});
