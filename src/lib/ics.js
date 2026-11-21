import { eventStart } from './time.js';

const stamp = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const esc = (s = '') => s.replace(/\\/g, '\\\\').replace(/([,;])/g, '\\$1').replace(/\n/g, '\\n');

/** items: [{ day, event }] */
export function downloadICS(items, filename) {
  const now = stamp(new Date());
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Fiestas Patronales 2026//Virgen del Valle//ES', 'CALSCALE:GREGORIAN'];
  items.forEach(({ day, event }, i) => {
    const start = eventStart(day, event);
    if (!start) return;
    const end = new Date(start.getTime() + (event.type === 'misa' ? 90 : 60) * 60e3);
    const desc = [event.detail, day.intention && `Intención: ${day.intention}`, 'Cronograma 2026 — Ntra. Sra. del Valle']
      .filter(Boolean)
      .join('\n');
    lines.push(
      'BEGIN:VEVENT',
      `UID:${day.id}-${i}-${event.time.replace(':', '')}@virgendelvalle2026`,
      `DTSTAMP:${now}`,
      `DTSTART:${stamp(start)}`,
      `DTEND:${stamp(end)}`,
      `SUMMARY:${esc(event.title)}`,
      `DESCRIPTION:${esc(desc)}`,
      'LOCATION:Parroquia Ntra. Sra. del Valle',
      'END:VEVENT'
    );
  });
  lines.push('END:VCALENDAR');
  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
