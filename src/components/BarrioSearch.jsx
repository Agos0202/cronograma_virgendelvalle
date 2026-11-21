import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DAYS, PLACES } from '../data.js';
import { argDate, dayStatus, useNow } from '../lib/time.js';
import { downloadICS } from '../lib/ics.js';
import * as I from './Icons.jsx';

const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/^(b°|barrio|b)\s*/, '').trim();

function daysUntil(date, now) {
  const a = new Date(`${argDate(now)}T00:00:00Z`);
  const b = new Date(`${date}T00:00:00Z`);
  return Math.round((b - a) / 864e5);
}

function lines(place, day) {
  const get = (type, time) => day.events.find((e) => e.type === type && (!time || e.time === time));
  if (place.kind === 'caravana') {
    return [get('caravana'), get('procesion', '19:00'), get('misa')].filter(Boolean);
  }
  if (place.kind === 'ninos') {
    const ninos = day.events.find((e) => e.title === 'Procesión de Niños');
    return [ninos, get('misa')].filter(Boolean);
  }
  return [get('salida'), day.events.find((e) => e.type === 'procesion' && e.title === 'Procesión'), get('misa')].filter(Boolean);
}

const lineText = (place, e) => {
  if (e.type === 'salida') return { t: 'Salen las imágenes desde la parroquia', d: `Visitan el barrio ${place.name} durante el día` };
  if (e.type === 'procesion' && e.title === 'Procesión') return { t: 'Procesión de regreso', d: 'Desde el barrio hacia la parroquia' };
  if (e.type === 'misa') return { t: 'Santa Misa', d: 'En la parroquia' };
  return { t: e.title, d: e.detail };
};

function Result({ place, now, notify }) {
  const day = DAYS[place.dayIndex];
  const items = lines(place, day);
  const status = dayStatus(day, now);
  const n = daysUntil(day.date, now);
  const when = status === 'past' ? 'Ya pasó' : n <= 0 ? '¡Es hoy!' : n === 1 ? 'Es mañana' : `Faltan ${n} días`;

  const viewDay = () => {
    window.dispatchEvent(new CustomEvent('novena:select', { detail: place.dayIndex }));
  };
  const save = () => {
    downloadICS(items.map((event) => ({ day, event })), `barrio-${norm(place.name).replace(/\s+/g, '-')}.ics`);
    notify(`Guardado en tu calendario: ${place.name}`);
  };

  return (
    <motion.article
      key={place.name}
      className="card result"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="result-head">
        <div>
          <p className="result-place"><I.Houses size={22} /> {place.kind === 'barrio' ? `Barrio ${place.name}` : place.name}</p>
          <h3 className="result-date">{day.weekday} {Number(day.num)} de {day.month}</h3>
        </div>
        <span className={`status st-${status}`}>{when}</span>
      </div>

      <ul className="result-list">
        {items.map((e) => {
          const { t, d } = lineText(place, e);
          return (
            <li key={e.time + e.title}>
              <span className="result-time">{e.time} <small>hs</small></span>
              <span className="result-text"><strong>{t}</strong>{d && <span>{d}</span>}</span>
            </li>
          );
        })}
      </ul>

      {place.others?.length > 0 && (
        <p className="result-note">Ese día las imágenes también visitan: {place.others.join(', ')}.</p>
      )}
      <p className="result-note">Intención del día: <b>“{day.intention}”</b></p>

      <div className="result-actions">
        <button className="btn btn-primary" onClick={viewDay}>
          <I.Rosary size={20} /> Ver todo el programa de ese día
        </button>
        <button className="btn btn-soft" onClick={save}>
          <I.Calendar size={20} /> Guardar en mi calendario
        </button>
      </div>
    </motion.article>
  );
}

export default function BarrioSearch({ notify }) {
  const now = useNow(60000);
  const [q, setQ] = useState('');
  const [picked, setPicked] = useState(null);

  const matches = useMemo(() => {
    const k = norm(q);
    return k ? PLACES.filter((p) => norm(p.name).includes(k)) : PLACES;
  }, [q]);

  const shown = picked ?? (q && matches.length === 1 ? matches[0] : null);

  return (
    <section id="barrio" className="section">
      <header className="sec-head center">
        <p className="eyebrow">Buscador</p>
        <h2 className="sec-title">¿Cuándo pasa la Virgen por mi barrio?</h2>
        <p className="sec-lead">Escribí el nombre de tu barrio o tocalo en la lista.</p>
      </header>

      <div className="search-wrap">
        <label className="search">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={q}
            placeholder="Ej.: Tres Luces, La Boca, Quilmes…"
            aria-label="Nombre del barrio"
            onChange={(e) => {
              setQ(e.target.value);
              setPicked(null);
            }}
          />
          {q && (
            <button className="search-clear" onClick={() => { setQ(''); setPicked(null); }}>
              Borrar
            </button>
          )}
        </label>

        <div className="chips" aria-label="Barrios">
          {matches.map((p) => (
            <button
              key={p.name}
              className={`chip-b ${shown?.name === p.name ? 'on' : ''}`}
              onClick={() => setPicked(p)}
            >
              {p.name}
            </button>
          ))}
        </div>

        {q && matches.length === 0 && (
          <p className="no-results">
            No encontramos “{q}”. Revisá cómo está escrito o borrá la búsqueda para ver todos los barrios.
          </p>
        )}

        <AnimatePresence mode="wait">{shown && <Result key={shown.name} place={shown} now={now} notify={notify} />}</AnimatePresence>
      </div>
    </section>
  );
}
