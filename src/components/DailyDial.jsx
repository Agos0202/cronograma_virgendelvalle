import { useState } from 'react';
import { motion } from 'framer-motion';
import { ROUTINE } from '../data.js';
import { argMinutes, useNow } from '../lib/time.js';
import { TYPE_ICON } from './Icons.jsx';

const C = 200;
const toMin = (t) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};
const polar = (min, r) => {
  const a = (min / 1440) * Math.PI * 2 - Math.PI / 2;
  return [C + r * Math.cos(a), C + r * Math.sin(a)];
};
const arc = (from, to, r) => {
  const [x1, y1] = polar(from, r);
  const [x2, y2] = polar(to, r);
  const large = to - from > 720 ? 1 : 0;
  return `M${x1.toFixed(2)} ${y1.toFixed(2)} A${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
};

const ARCS = [
  { from: 420, to: 480, cls: 'arc-morning', label: 'Mañana: rosario y desayuno' },
  { from: 480, to: 1140, cls: 'arc-mission', label: 'Las imágenes en el barrio' },
  { from: 1140, to: 1290, cls: 'arc-evening', label: 'Tarde: procesión y misa' },
];

export default function DailyDial() {
  const now = useNow(20000);
  const [hover, setHover] = useState(null);
  const mins = argMinutes(now);
  const hh = String(Math.floor(mins / 60)).padStart(2, '0');
  const mm = String(mins % 60).padStart(2, '0');
  const handAngle = (mins / 1440) * 360;
  const nextIdx = ROUTINE.findIndex((r) => toMin(r.time) > mins);

  return (
    <section id="ritmo" className="section">
      <header className="sec-head center">
        <p className="eyebrow">Del 29 de noviembre al 7 de diciembre</p>
        <h2 className="sec-title">Horarios que se repiten todos los días</h2>
        <p className="sec-lead">Estos encuentros se hacen cada día de la novena, a la misma hora.</p>
      </header>

      <div className="ritmo-grid">
        <motion.div
          className="card routine"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
        >
          <ol>
            {ROUTINE.map((r, i) => {
              const Icon = TYPE_ICON[r.type];
              return (
                <li
                  key={r.time}
                  className={`rt ${hover === i ? 'on' : ''}`}
                  onPointerEnter={() => setHover(i)}
                  onPointerLeave={() => setHover(null)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  tabIndex={0}
                >
                  <span className="rt-n">{i + 1}</span>
                  <span className="rt-time">{r.time} <small>hs</small></span>
                  <span className="rt-icon"><Icon size={24} /></span>
                  <span className="rt-title">
                    {r.title}
                    {nextIdx === i && <em className="tag">Lo próximo</em>}
                  </span>
                </li>
              );
            })}
          </ol>
        </motion.div>

        <motion.div
          className="dial-wrap"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8 }}
        >
          <svg className="dial" viewBox="0 0 400 400" role="img" aria-label="Reloj de 24 horas con los momentos de cada día">
            <circle cx={C} cy={C} r="186" className="dial-face" />
            {Array.from({ length: 24 }, (_, i) => {
              const [x1, y1] = polar(i * 60, i % 3 === 0 ? 164 : 170);
              const [x2, y2] = polar(i * 60, 176);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className={i % 3 === 0 ? 'tick major' : 'tick'} />;
            })}
            {[0, 3, 6, 9, 12, 15, 18, 21].map((h) => {
              const [x, y] = polar(h * 60, 120);
              return <text key={h} x={x} y={y} className="dial-hour" textAnchor="middle" dominantBaseline="central">{h} h</text>;
            })}
            {ARCS.map((a) => (
              <path key={a.cls} d={arc(a.from, a.to, 148)} className={`dial-arc ${a.cls}`} fill="none" />
            ))}
            {ROUTINE.map((r, i) => {
              const [x, y] = polar(toMin(r.time), 148);
              const on = hover === i;
              return (
                <g key={r.time} className={`dial-mark ${on ? 'on' : ''}`} onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)}>
                  <circle cx={x} cy={y} r={on ? 14 : 11} className="dm-c" />
                  <text x={x} y={y} textAnchor="middle" dominantBaseline="central" className="dm-t">{i + 1}</text>
                </g>
              );
            })}
            <g style={{ transform: `rotate(${handAngle}deg)`, transformOrigin: '200px 200px', transition: 'transform 1s ease' }}>
              <line x1={C} y1={C} x2={C} y2={C - 132} className="hand" />
              <circle cx={C} cy={C - 132} r="5" className="hand-tip" />
            </g>
            <circle cx={C} cy={C} r="54" className="dial-center" />
            <text x={C} y={C - 4} textAnchor="middle" className="dial-now">{hh}:{mm}</text>
            <text x={C} y={C + 20} textAnchor="middle" className="dial-now-l">hora actual</text>
          </svg>
          <div className="legend">
            {ARCS.map((a) => (
              <span key={a.cls} className={`lg-item ${a.cls}`}><i />{a.label}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
