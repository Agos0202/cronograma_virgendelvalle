import { asset } from './lib/asset.js';
import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Nav, { scrollToId } from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import GreatDay from './components/GreatDay.jsx';
import Novena from './components/Novena.jsx';
import DailyDial from './components/DailyDial.jsx';
import BarrioSearch from './components/BarrioSearch.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import { LEMA } from './data.js';
import * as I from './components/Icons.jsx';

export default function App() {
  const [toast, setToast] = useState(null);
  const notify = useCallback((msg) => setToast({ msg, id: Date.now() }), []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <>
      <motion.div className="progress" style={{ scaleX }} />
      <Nav notify={notify} />
      <MusicPlayer />

      <main>
        <Hero />
        <BarrioSearch notify={notify} />
        <GreatDay notify={notify} />
        <Novena notify={notify} />
        <DailyDial />
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <img className="footer-logo" src={asset('logo-lema.png')} alt={`Lema: ${LEMA}`} />
          <p className="footer-meta">Cronograma 2026 · Parroquia Nuestra Señora del Valle</p>
          <button className="btn btn-light" onClick={() => scrollToId('inicio')}>
            Volver al inicio ↑
          </button>
        </div>
      </footer>

      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            className="toast"
            role="status"
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 12, x: '-50%' }}
            transition={{ duration: 0.3 }}
          >
            <span className="toast-ic"><I.Calendar size={18} /></span>
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
