import { useEffect, useRef, useState } from 'react';
import { asset } from '../lib/asset.js';

// musica-virgencita.mp3 ya está recortada para empezar en el segundo 15 de la canción original,
// así funciona igual en cualquier navegador y servidor (sin depender de saltos de tiempo).

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);
  const fadeRef = useRef(0);

  const play = async () => {
    const a = audioRef.current;
    if (!a) return;
    try {
      a.volume = 0;
      await a.play();
      // entrada suave del volumen
      cancelAnimationFrame(fadeRef.current);
      const t0 = performance.now();
      const step = (t) => {
        const k = Math.min(1, (t - t0) / 1500);
        a.volume = k;
        if (k < 1) fadeRef.current = requestAnimationFrame(step);
      };
      fadeRef.current = requestAnimationFrame(step);
    } catch {
      a.volume = 1; /* el navegador todavía no lo permite */
    }
  };

  useEffect(() => {
    const a = audioRef.current;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    a.addEventListener('play', onPlay);
    a.addEventListener('pause', onPause);

    // intenta sonar al abrir; si el navegador lo bloquea, arranca con el primer toque en la página
    play();
    const onFirst = () => {
      if (!userPaused.current && a.paused) play();
      window.removeEventListener('pointerdown', onFirst);
      window.removeEventListener('keydown', onFirst);
    };
    window.addEventListener('pointerdown', onFirst);
    window.addEventListener('keydown', onFirst);

    return () => {
      cancelAnimationFrame(fadeRef.current);
      a.removeEventListener('play', onPlay);
      a.removeEventListener('pause', onPause);
      window.removeEventListener('pointerdown', onFirst);
      window.removeEventListener('keydown', onFirst);
    };
  }, []);

  const toggle = (e) => {
    e.stopPropagation();
    const a = audioRef.current;
    if (a.paused) {
      userPaused.current = false;
      play();
    } else {
      userPaused.current = true;
      a.pause();
    }
  };

  return (
    <>
      <audio ref={audioRef} src={asset('musica-virgencita.mp3')} preload="auto" loop />
      <button
        className={`music-btn ${playing ? 'is-playing' : ''}`}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={toggle}
        aria-pressed={playing}
        title="Serenata a la Virgen del Valle — Hay una Virgencita"
      >
        <span className="music-ic" aria-hidden="true">
          {playing ? (
            <span className="eq"><i /><i /><i /></span>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l11-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="16" r="3" />
            </svg>
          )}
        </span>
        <span>{playing ? 'Pausar música' : 'Escuchar música'}</span>
      </button>
    </>
  );
}
