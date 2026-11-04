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

test('every event resolves through a unit to a subject and all demo dates are correct', async () => {
  const { subjects, units, events, eventContext } = await import('../src/data.js');
  for (const records of [subjects, units, events]) assert.equal(new Set(records.map(record => record.id)).size, records.length);
  for (const event of events) {
    const resolved = eventContext(event);
    assert.ok(resolved.unit?.title, event.id);
    assert.ok(resolved.subject?.name, event.id);
    assert.match(event.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(['test', 'homework', 'review'].includes(event.type));
  }
  assert.deepEqual(events.map(({ date, type }) => [date, type]), [
    ['2026-11-05', 'test'], ['2026-11-05', 'test'],
    ['2026-11-12', 'test'], ['2026-11-18', 'homework'],
  ]);
});
