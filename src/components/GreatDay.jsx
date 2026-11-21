import { motion } from 'framer-motion';
import { FEAST, VIGIL, DAYS } from '../data.js';
import { eventStart, useNow } from '../lib/time.js';
import { downloadICS } from '../lib/ics.js';
import { TYPE_ICON } from './Icons.jsx';
import * as I from './Icons.jsx';

const EVE_DAY = DAYS[DAYS.length - 2];

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] },
};

function Row({ day, e, done, notify }) {
  const Icon = TYPE_ICON[e.type] || I.Cross;
  const add = () => {
    downloadICS([{ day, event: e }], `virgen-del-valle-${day.date}-${e.time.replace(':', '')}.ics`);
    notify(`“${e.title}” guardado en tu calendario`);
  };
  return (
    <li className={`ev ${done ? 'is-done' : ''}`}>
      <span className="ev-time">
        {e.time} <small>hs</small>
        {e.nextDay && <em>Ya es 8 de dic.</em>}
      </span>
      <span className="ev-icon"><Icon size={26} /></span>
      <span className="ev-text">
        <strong>{e.title}</strong>
        {e.detail && <span>{e.detail}</span>}
      </span>
      <button className="ev-add" onClick={add} aria-label={`Guardar ${e.title} en el calendario`}>
        <I.Calendar size={20} /> <span>Agendar</span>
      </button>
    </li>
  );
}

export default function GreatDay({ notify }) {
  const now = useNow(30000);
  const passed = (d, e) => eventStart(d, e) < now;
  const timed = [...VIGIL.map((e) => [EVE_DAY, e]), ...FEAST.events.filter((e) => e.time).map((e) => [FEAST, e])];
  const culmination = FEAST.events.find((e) => e.culmination);

  const addAll = () => {
    downloadICS(timed.map(([day, event]) => ({ day, event })), 'virgen-del-valle-8-diciembre-2026.ics');
    notify('Todo el programa del 8 de diciembre quedó guardado en tu calendario');
  };

  return (
    <section id="gran-dia" className="section">
      <motion.header className="sec-head center" {...reveal}>
        <div className="date-badge" aria-hidden="true">
          <span className="db-month">Diciembre</span>
          <span className="db-num">8</span>
          <span className="db-wd">Martes</span>
        </div>
        <p className="eyebrow">Martes 8 de diciembre</p>
        <h2 className="sec-title">Solemnidad de la Pura y Limpia Concepción del Valle</h2>
        <p className="sec-lead">Este es el programa de la víspera y del gran día de nuestra Madre del Valle.</p>
      </motion.header>

      <div className="gd-stack">
        <motion.article className="card" {...reveal}>
          <h3 className="card-title">
            <I.Moon size={24} /> La víspera <small>Lunes 7 de diciembre, por la noche</small>
          </h3>
          <ul className="ev-list">
            {VIGIL.map((e) => (
              <Row key={e.time} day={EVE_DAY} e={e} done={passed(EVE_DAY, e)} notify={notify} />
            ))}
          </ul>
        </motion.article>

        <motion.article className="card" {...reveal}>
          <h3 className="card-title">
            <I.Crown size={24} /> El gran día <small>Martes 8 de diciembre</small>
          </h3>
          <ul className="ev-list">
            {FEAST.events.filter((e) => e.time).map((e) => (
              <Row key={e.time} day={FEAST} e={e} done={passed(FEAST, e)} notify={notify} />
            ))}
          </ul>

          <div className="finale">
            <span className="finale-icon"><I.Church size={30} /></span>
            <div>
              <p className="finale-label">Al finalizar la procesión</p>
              <p className="finale-title">Santa Misa</p>
            </div>
          </div>
        </motion.article>

        <motion.div className="center" {...reveal}>
          <button className="btn btn-primary" onClick={addAll}>
            <I.Calendar size={22} /> Guardar todo el 8 de diciembre en mi calendario
          </button>
        </motion.div>
      </div>
    </section>
  );
}
