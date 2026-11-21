import { asset } from '../lib/asset.js';
import { useEffect, useState } from 'react';
import * as I from './Icons.jsx';

const LINKS = [
  { id: 'inicio', label: 'Inicio', icon: I.Church },
  { id: 'barrio', label: 'Mi barrio', short: 'Barrio', icon: I.Houses },
  { id: 'gran-dia', label: '8 de Diciembre', short: '8 Dic', icon: I.Crown },
  { id: 'novena', label: 'Todos los días', short: 'Días', icon: I.Rosary },
  { id: 'ritmo', label: 'Horarios fijos', short: 'Horarios', icon: I.Bell },
];

export function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Nav({ notify }) {
  const [active, setActive] = useState('inicio');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const share = async () => {
    const data = {
      title: 'Cronograma 2026 · Virgen del Valle',
      text: 'Cronograma 2026 en honor a Ntra. Sra. del Valle',
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(window.location.href);
      notify('Enlace copiado. Ya lo podés pegar en WhatsApp.');
    } catch (e) {
      if (e?.name !== 'AbortError') notify('No se pudo compartir');
    }
  };

  return (
    <>
      <header className={`topbar ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="topbar-inner">
          <button className="brand" onClick={() => scrollToId('inicio')} aria-label="Ir al inicio">
            <span className="brand-mark"><img src={asset('virgen-1.jpeg')} alt="" /></span>
            <span className="brand-text">
              <strong>Ntra. Sra. del Valle</strong>
              <small>Cronograma 2026</small>
            </span>
          </button>

          <nav className="toplinks" aria-label="Secciones">
            {LINKS.map((l) => (
              <button key={l.id} className={`toplink ${active === l.id ? 'on' : ''}`} onClick={() => scrollToId(l.id)}>
                {l.label}
              </button>
            ))}
          </nav>

          <button className="share-btn" onClick={share}>
            <I.Share size={18} /> <span>Compartir</span>
          </button>
        </div>
      </header>

      <nav className="dock" aria-label="Secciones">
        {LINKS.map((l) => {
          const Icon = l.icon;
          return (
            <button key={l.id} className={`docklink ${active === l.id ? 'on' : ''}`} onClick={() => scrollToId(l.id)}>
              <Icon size={22} />
              <span>{l.short || l.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
