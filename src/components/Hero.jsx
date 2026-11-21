import { asset } from '../lib/asset.js';
import { motion } from 'framer-motion';
import { LEMA } from '../data.js';
import { at, useNow } from '../lib/time.js';
import { scrollToId } from './Nav.jsx';
import * as I from './Icons.jsx';
import PhotoSlider from './Gallery.jsx';

const TARGET = at('2026-12-08', '19:00');
const NOVENA_START = at('2026-11-29', '07:00');

function Countdown() {
  const now = useNow(1000);
  const diff = TARGET - now;

  if (diff <= 0) {
    const sameDay = now - TARGET < 8 * 3600e3;
    return (
      <p className="cd-done">
        {sameDay ? '¡Hoy celebramos a nuestra Madre del Valle!' : 'Gracias por caminar juntos bajo su manto.'}
      </p>
    );
  }

  const s = Math.floor(diff / 1000);
  const parts = [
    [Math.floor(s / 86400), 'días'],
    [Math.floor((s % 86400) / 3600), 'horas'],
    [Math.floor((s % 3600) / 60), 'minutos'],
    [s % 60, 'segundos'],
  ];
  const daysToNovena = Math.ceil((NOVENA_START - now) / 864e5);

  return (
    <div className="cd-box">
      <p className="cd-title">Faltan para la solemne procesión del 8 de diciembre</p>
      <div className="cd">
        {parts.map(([v, l]) => (
          <div key={l} className="cd-unit">
            <span className="cd-num">{String(v).padStart(2, '0')}</span>
            <span className="cd-label">{l}</span>
          </div>
        ))}
      </div>
      {daysToNovena > 0 && (
        <p className="cd-sub">
          La novena comienza en <b>{daysToNovena} {daysToNovena === 1 ? 'día' : 'días'}</b>, el domingo 29 de noviembre.
        </p>
      )}
    </div>
  );
}

const fade = (i) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.1 + i * 0.1, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
});

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-inner">
        <motion.div {...fade(0)}>
          <PhotoSlider />
        </motion.div>

        <motion.p className="hero-kicker" {...fade(1)}>Cronograma 2026</motion.p>

        <motion.h1 className="hero-title" {...fade(2)}>
          Nuestra Señora <span>del Valle</span>
        </motion.h1>

        <motion.p className="hero-dates" {...fade(3)}>
          Del domingo 29 de noviembre al martes 8 de diciembre
        </motion.p>

        <motion.img className="hero-logo" src={asset('logo-lema.png')} alt={`Lema: ${LEMA}`} {...fade(4)} />

        <motion.div {...fade(5)}>
          <Countdown />
        </motion.div>

        <motion.div className="hero-cta" {...fade(6)}>
          <button className="btn btn-white" onClick={() => scrollToId('gran-dia')}>
            <I.Crown size={22} /> Ver el 8 de diciembre
          </button>
          <button className="btn btn-outline-white" onClick={() => scrollToId('barrio')}>
            <I.Houses size={22} /> Buscar mi barrio
          </button>
          <button className="btn btn-outline-white" onClick={() => scrollToId('novena')}>
            <I.Rosary size={22} /> Ver todos los días
          </button>
        </motion.div>
      </div>

      <svg className="hero-wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 90V40C240 75 480 90 720 90S1200 75 1440 40V90Z" fill="var(--bg)" />
      </svg>
    </section>
  );
}
