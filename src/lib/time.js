import { useEffect, useState } from 'react';

const OFFSET = '-03:00'; // Argentina
const DAY_MS = 864e5;

export function at(date, time, plusDays = 0) {
  const d = new Date(`${date}T${time}:00${OFFSET}`);
  return new Date(d.getTime() + plusDays * DAY_MS);
}

export function eventStart(day, e) {
  if (!e.time) return null;
  return at(day.date, e.time, e.nextDay ? 1 : 0);
}

export function dayRange(day) {
  const times = day.events.map((e) => eventStart(day, e)).filter(Boolean);
  const start = new Date(Math.min(...times));
  const end = new Date(Math.max(...times) + 150 * 60e3);
  return { start, end };
}

export function dayStatus(day, now) {
  const { start, end } = dayRange(day);
  const sameDate = argDate(now) === day.date;
  if (now > end) return 'past';
  if (sameDate || (now >= start && now <= end)) return 'today';
  return 'upcoming';
}

/** índice del evento en curso (o -1) */
export function liveIndex(day, now) {
  const starts = day.events.map((e) => eventStart(day, e));
  for (let i = 0; i < starts.length; i++) {
    const s = starts[i];
    if (!s) continue;
    const next = starts.slice(i + 1).find((x) => x && x > s);
    const end = next && next - s < 3 * 3600e3 ? next : new Date(s.getTime() + 75 * 60e3);
    if (now >= s && now < end) return i;
  }
  return -1;
}

/** "YYYY-MM-DD" en hora argentina */
export function argDate(d) {
  const a = new Date(d.getTime() - 3 * 3600e3);
  return a.toISOString().slice(0, 10);
}

export function argMinutes(d) {
  return (((d.getUTCHours() - 3 + 24) % 24) * 60) + d.getUTCMinutes();
}

export function useNow(interval = 1000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), interval);
    return () => clearInterval(id);
  }, [interval]);
  return now;
}
