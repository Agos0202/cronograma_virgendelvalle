import { useEffect, useRef, useState } from 'react';
import { asset } from '../lib/asset.js';

const START = 15; // la canción empieza desde el segundo 15

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);

  const play = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.currentTime < START) a.currentTime = START;
    try {
      await a.play();
    } catch {
      /* el navegador todavía no lo permite */
    }
  };

  useEffect(() => {
    const a = audioRef.current;
    const onMeta = () => {
      if (a.currentTime < START) a.currentTime = START;
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => {
      a.currentTime = START;
      a.play().catch(() => {});
    };
    a.addEventListener('loadedmetadata', onMeta);
    a.addEventListener('play', onPlay);
    a.addEventListener('pause', onPause);
    a.addEventListener('ended', onEnded);

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
      a.removeEventListener('loadedmetadata', onMeta);
      a.removeEventListener('play', onPlay);
      a.removeEventListener('pause', onPause);
      a.removeEventListener('ended', onEnded);
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
      <audio ref={audioRef} src={asset('musica.mp3')} preload="auto" />
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
