import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DAYS } from '../data.js';
import { dayRange, dayStatus, liveIndex, useNow } from '../lib/time.js';
import { downloadICS } from '../lib/ics.js';
import { TYPE_ICON } from './Icons.jsx';
import * as I from './Icons.jsx';

const STATUS = { past: 'Ya pasó', today: 'Hoy', upcoming: '' };
const MES = { noviembre: 'nov.', diciembre: 'dic.' };

function initialIndex(now) {
  const i = DAYS.findIndex((d) => dayRange(d).end >= now);
  return i === -1 ? DAYS.length - 1 : i;
}

export default function Novena({ notify }) {
  const now = useNow(30000);
  const [idx, setIdx] = useState(() => initialIndex(new Date()));
  const detailRef = useRef(null);
  const sectionRef = useRef(null);
  const day = DAYS[idx];
  const status = dayStatus(day, now);
  const live = status === 'today' ? liveIndex(day, now) : -1;

  const go = (n, { scroll = false } = {}) => {
    const next = Math.max(0, Math.min(DAYS.length - 1, n));
    setIdx(next);
    if (scroll) {
      requestAnimationFrame(() => {
        const el = detailRef.current;
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top > window.innerHeight * 0.5 || top < 0) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  };

  // el buscador de barrios pide abrir un día
  useEffect(() => {
    const onSelect = (e) => {
      setIdx(e.detail);
      requestAnimationFrame(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    };
    window.addEventListener('novena:select', onSelect);
    return () => window.removeEventListener('novena:select', onSelect);
  }, []);

  // flechas del teclado cuando la sección está en pantalla
  useEffect(() => {
    const onKey = (e) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
      if (/input|textarea|select/i.test(document.activeElement?.tagName || '')) return;
      const r = sectionRef.current?.getBoundingClientRect();
      if (!r || r.top > window.innerHeight * 0.6 || r.bottom < window.innerHeight * 0.4) return;
      e.preventDefault();
      go(idx + (e.key === 'ArrowRight' ? 1 : -1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const info = useMemo(
    () =>
      [
        day.group && { icon: I.Praying, k: 'Grupo a cargo', v: day.group, note: '(Rezo del Santo Rosario, desayuno y procesión de la tarde)' },
        day.barrio && { icon: I.Houses, k: 'Las imágenes visitan', v: `Barrio ${day.barrio}` },
        day.invited && { icon: I.Chapel, k: 'Comunidad invitada', v: day.invited },
        day.liturgy && { icon: I.Bible, k: 'Liturgia a cargo de', v: day.liturgy },
      ].filter(Boolean),
    [day]
  );

  const addDay = () => {
    downloadICS(day.events.map((event) => ({ day, event })), `fiestas-patronales-${day.date}.ics`);
    notify(`El ${day.weekday.toLowerCase()} ${Number(day.num)} quedó guardado en tu calendario`);
  };

  const prev = DAYS[idx - 1];
  const next = DAYS[idx + 1];

  return (
    <section id="novena" className="section section-tint" ref={sectionRef}>
      <header className="sec-head center">
        <p className="eyebrow">Novena · del 29 de noviembre al 8 de diciembre</p>
        <h2 className="sec-title">El programa de cada día</h2>
        <p className="sec-lead">Tocá un día para ver su intención, el barrio que visitan las imágenes y todos los horarios.</p>
      </header>

      <div className="days" role="tablist" aria-label="Días de la novena">
        {DAYS.map((d, i) => {
          const st = dayStatus(d, now);
          return (
            <button
              key={d.id}
              role="tab"
              aria-selected={i === idx}
              className={`daybtn ${i === idx ? 'on' : ''} ${d.feast ? 'feast' : ''} st-${st}`}
              onClick={() => go(i, { scroll: true })}
            >
              <span className="daybtn-wd">{d.weekday}</span>
              <span className="daybtn-num">{Number(d.num)}</span>
              <span className="daybtn-mo">{d.feast ? 'Fiesta' : MES[d.month]}</span>
              {st === 'today' && <span className="daybtn-badge">Hoy</span>}
            </button>
          );
        })}
      </div>

      <div className="detail" ref={detailRef}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={day.id}
            className={`card day-card ${day.feast ? 'is-feast' : ''}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <header className="day-head">
              <div>
                <p className="day-count">Día {idx + 1} de {DAYS.length}</p>
                <h3 className="day-date">{day.weekday} {Number(day.num)} de {day.month}</h3>
              </div>
              {STATUS[status] && <span className={`status st-${status}`}>{STATUS[status]}</span>}
            </header>

            <div className="intention">
              <p className="intention-label">{day.feast ? 'Martes 8 de diciembre' : 'Intención del día'}</p>
              <p className="intention-text">“{day.intention}”</p>
            </div>

            <div className="day-body">
              {info.length > 0 && (
                <dl className="facts">
                  {info.map(({ icon: Icon, k, v, note }) => (
                    <div className="fact" key={k}>
                      <span className="fact-icon"><Icon size={24} /></span>
                      <div>
                        <dt>{k}</dt>
                        <dd>{v}</dd>
                        {note && <dd className="fact-note">{note}</dd>}
                      </div>
                    </div>
                  ))}
                </dl>
              )}

              <div className="schedule">
                <p className="schedule-title">Horarios</p>
                <ol className="sch">
                  {day.events.map((e, i) => {
                    const Icon = TYPE_ICON[e.type] || I.Cross;
                    return (
                      <li key={`${e.time}-${i}`} className={`sch-item ${e.special ? 'special' : ''} ${i === live ? 'live' : ''} ${e.culmination ? 'culm' : ''}`}>
                        <span className="sch-time">
                          {e.time ? <>{e.time} <small>hs</small></> : <small className="sch-label">{e.label}</small>}
                        </span>
                        <span className="sch-icon"><Icon size={22} /></span>
                        <span className="sch-text">
                          <strong>{e.title}</strong>
                          {e.detail && <span>{e.detail}</span>}
                          {e.nextDay && <span className="sch-note">Ya es martes 8 de diciembre</span>}
                          {i === live && <em className="tag tag-live">Ahora</em>}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>

            <footer className="day-foot">
              <button className="btn btn-soft" onClick={() => go(idx - 1)} disabled={!prev}>
                <I.ArrowL size={20} />
                <span>{prev ? <>Día anterior<small>{prev.weekday} {Number(prev.num)}</small></> : 'Día anterior'}</span>
              </button>
              <button className="btn btn-primary" onClick={addDay}>
                <I.Calendar size={20} /> Guardar este día
              </button>
              <button className="btn btn-soft right" onClick={() => go(idx + 1)} disabled={!next}>
                <span>{next ? <>Día siguiente<small>{next.weekday} {Number(next.num)}</small></> : 'Día siguiente'}</span>
                <I.ArrowR size={20} />
              </button>
            </footer>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}
