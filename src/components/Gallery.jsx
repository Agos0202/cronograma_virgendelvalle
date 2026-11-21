import { asset } from '../lib/asset.js';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const MAIN_PHOTO = asset('virgen-1.jpeg');

export const PHOTOS = [
  { src: asset('virgen-1.jpeg'), alt: 'Nuestra Señora del Valle frente al altar de la parroquia' },
  { src: asset('virgen-2.jpeg'), alt: 'Nuestra Señora del Valle de perfil, con su corona y manto celeste' },
  { src: asset('virgen-3.jpeg'), alt: 'Nuestra Señora del Valle con el Sagrado Corazón de fondo' },
];

const INTERVAL = 5000;

/** Fotos de la Virgen que se deslizan solas */
export default function PhotoSlider() {
  const [[i, dir], setState] = useState([0, 1]);
  const [paused, setPaused] = useState(false);

  const go = (n, d) => setState([(n + PHOTOS.length) % PHOTOS.length, d]);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => go(i + 1, 1), INTERVAL);
    return () => clearTimeout(id);
  }, [i, paused]);

  // precarga las demás fotos para que el cambio sea suave
  useEffect(() => {
    PHOTOS.forEach((p) => {
      const img = new Image();
      img.src = p.src;
    });
  }, []);

  return (
    <div
      className="slider"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="niche">
        <div className="niche-in">
        <AnimatePresence initial={false} custom={dir}>
          <motion.img
            key={PHOTOS[i].src}
            src={PHOTOS[i].src}
            alt={PHOTOS[i].alt}
            custom={dir}
            initial={{ x: `${dir * 100}%` }}
            animate={{ x: '0%' }}
            exit={{ x: `${dir * -100}%` }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, { offset }) => {
              if (offset.x < -50) go(i + 1, 1);
              else if (offset.x > 50) go(i - 1, -1);
            }}
            draggable={false}
          />
        </AnimatePresence>
        </div>
      </div>

      <div className="dots" role="tablist" aria-label="Fotos de la Virgen">
        {PHOTOS.map((p, n) => (
          <button
            key={p.src}
            role="tab"
            aria-selected={n === i}
            aria-label={`Ver foto ${n + 1} de ${PHOTOS.length}`}
            className={`dot ${n === i ? 'on' : ''}`}
            onClick={() => go(n, n > i ? 1 : -1)}
          />
        ))}
      </div>
    </div>
  );
}
