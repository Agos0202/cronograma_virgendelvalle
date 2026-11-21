// Íconos de estilo parroquial, trazo redondeado y cálido
const S = ({ children, size = 20, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    {children}
  </svg>
);

/** Rosario con cruz */
export const Rosary = (p) => (
  <S {...p}>
    <circle cx="12" cy="2.8" r="1.1" /><circle cx="16" cy="3.9" r="1.1" /><circle cx="18.6" cy="7" r="1.1" />
    <circle cx="18.4" cy="10.9" r="1.1" /><circle cx="8" cy="3.9" r="1.1" /><circle cx="5.4" cy="7" r="1.1" />
    <circle cx="5.6" cy="10.9" r="1.1" /><circle cx="15.4" cy="13.4" r="1.1" /><circle cx="8.6" cy="13.4" r="1.1" />
    <path d="M12 15v7M9.6 17.6h4.8" strokeWidth="1.9" />
  </S>
);
/** Mate con bombilla (desayuno comunitario) */
export const Mate = (p) => (
  <S {...p}>
    <path d="M6 10.5h11c.4 1 .6 2 .6 3a6.1 6.1 0 0 1-12.2 0c0-1 .2-2 .6-3z" />
    <path d="M6.8 10.5c.2-1.3 1.4-2 2.6-2h4.2c1.2 0 2.4.7 2.6 2" />
    <path d="M14 8.5 17.5 2.5M16.6 2l1.8 1" />
    <path d="M8.5 21h6" />
  </S>
);
/** Casitas del barrio */
export const Houses = (p) => (
  <S {...p}>
    <path d="M2.5 20.5V12l5-4.2 5 4.2v8.5" />
    <path d="M12.5 13.5l4.5-3.8 4.5 3.8v7" />
    <path d="M6 20.5v-3.5h3v3.5M15.5 20.5v-3h3v3M1.5 20.5h21" />
  </S>
);
/** Vela encendida (procesión) */
export const Candle = (p) => (
  <S {...p}>
    <path d="M12 2.5c1.6 1.8 2.2 3 2.2 4.2a2.2 2.2 0 0 1-4.4 0c0-1.2.6-2.4 2.2-4.2z" />
    <rect x="9" y="10.5" width="6" height="9" rx="1" />
    <path d="M6.5 21.5h11M12 8.9v1.6" />
  </S>
);
/** Iglesia de pueblo con campanario */
export const Church = (p) => (
  <S {...p}>
    <path d="M12 1.5v3.5M10.4 3h3.2" />
    <path d="M9 21V9.5L12 6.5l3 3V21" />
    <path d="M9 13H4.5v8M15 13h4.5v8" />
    <path d="M10.8 21v-3a1.2 1.2 0 0 1 2.4 0v3M12 10.2v.1M2.5 21h19" />
  </S>
);
/** Capilla pequeña (comunidades) */
export const Chapel = (p) => (
  <S {...p}>
    <path d="M12 2v3M10.6 3.4h2.8" />
    <path d="M5 21v-9l7-5.5 7 5.5v9" />
    <path d="M10 21v-4.5a2 2 0 0 1 4 0V21M3 21h18" />
  </S>
);
/** Cáliz con hostia */
export const Chalice = (p) => (
  <S {...p}>
    <circle cx="12" cy="5" r="3" />
    <path d="M12 3.6v2.8M10.6 5h2.8" strokeWidth="1.3" />
    <path d="M5.5 9.5h13c0 3.6-2.9 6-6.5 6s-6.5-2.4-6.5-6z" />
    <path d="M12 15.5v3.5M8 21.5h8M9.5 19h5" />
  </S>
);
/** Concha bautismal con gotas */
export const Shell = (p) => (
  <S {...p}>
    <path d="M3.5 13.5a8.5 8.5 0 0 1 17 0L12 21z" />
    <path d="M12 21V7.5M12 21 7 9M12 21l5-12M12 21 4.5 12M12 21l7.5-9" strokeWidth="1.2" />
    <path d="M8 2.5s-1 1.3-1 2a1 1 0 0 0 2 0c0-.7-1-2-1-2zM16 2.5s-1 1.3-1 2a1 1 0 0 0 2 0c0-.7-1-2-1-2z" strokeWidth="1.3" />
  </S>
);
export const Bike = (p) => (
  <S {...p}><circle cx="5.5" cy="16.5" r="3.5" /><circle cx="18.5" cy="16.5" r="3.5" /><path d="M5.5 16.5 9 9h6l3.5 7.5M9 9l3 7.5h-1M14 6h2.5" /></S>
);
/** Auto (caravana) */
export const Car = (p) => (
  <S {...p}>
    <path d="M3 16.5v-3.2l2-4.6A2 2 0 0 1 6.8 7.5h10.4a2 2 0 0 1 1.8 1.2l2 4.6v3.2z" />
    <path d="M3 13.3h18" /><circle cx="7.5" cy="17.5" r="1.8" /><circle cx="16.5" cy="17.5" r="1.8" />
  </S>
);
/** Luna y estrella (medianoche) */
export const Moon = (p) => (
  <S {...p}>
    <path d="M19.5 14.5A8 8 0 1 1 9.5 4.5a6.5 6.5 0 0 0 10 10z" />
    <path d="M17 3v3M15.5 4.5h3" />
  </S>
);
/** Silueta de la Virgen con manto */
export const Virgin = (p) => (
  <S {...p}>
    <path d="M12 3.2a2.6 2.6 0 0 0-2.6 2.6c0 1 .5 1.8 1.2 2.3L6 21.5h12L13.4 8.1a2.6 2.6 0 0 0-1.4-4.9z" />
    <path d="M9.2 4.6 8.6 3.5M14.8 4.6l.6-1.1M12 2.4V1.3" strokeWidth="1.3" />
    <path d="M10 15h4" strokeWidth="1.3" />
  </S>
);
/** Corona */
export const Crown = (p) => (
  <S {...p}>
    <path d="M4 18.5 3 8.5l5 4 4-7 4 7 5-4-1 10z" />
    <path d="M4.5 21.5h15" /><circle cx="12" cy="3.3" r=".9" />
  </S>
);
/** Campana */
export const Bell = (p) => (
  <S {...p}>
    <path d="M12 2.5v1.8" />
    <path d="M6.5 16.5V11a5.5 5.5 0 0 1 11 0v5.5l1.5 2H5z" />
    <path d="M10.5 20.5a1.6 1.6 0 0 0 3 0" />
  </S>
);
/** Cruz */
export const Cross = (p) => (
  <S {...p}><path d="M12 2.5v19M7 8h10" strokeWidth="2" /></S>
);
/** Manos en oración (grupos) */
export const Praying = (p) => (
  <S {...p}>
    <path d="M12 21V9.5c0-1.6-.6-3.6-1.5-5.4-.4-.8-1.6-.6-1.6.3V9l-3.4 5.2a3 3 0 0 0 .3 3.7L8.5 21" />
    <path d="M12 21V9.5c0-1.6.6-3.6 1.5-5.4.4-.8 1.6-.6 1.6.3V9l3.4 5.2a3 3 0 0 1-.3 3.7L15.5 21" />
  </S>
);
/** Biblia */
export const Bible = (p) => (
  <S {...p}>
    <path d="M5 4.5A2 2 0 0 1 7 2.5h12v16H7a2 2 0 0 0-2 2z" />
    <path d="M5 20.5a2 2 0 0 0 2 1h12v-3M12 6.5v7M9.5 9h5" />
  </S>
);
/** Corazón (intención) */
export const Heart = (p) => (
  <S {...p}><path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" /></S>
);

export const Calendar = (p) => (
  <S {...p}><rect x="3.5" y="5" width="17" height="15.5" rx="3" /><path d="M3.5 10h17M8 3v4M16 3v4M12 13.5v4M10 15.5h4" /></S>
);
export const Share = (p) => (
  <S {...p}><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4" /></S>
);
export const ArrowL = (p) => <S {...p}><path d="M15 5l-7 7 7 7" /></S>;
export const ArrowR = (p) => <S {...p}><path d="M9 5l7 7-7 7" /></S>;
export const ArrowDown = (p) => <S {...p}><path d="M12 4v16M5 13l7 7 7-7" /></S>;
export const Plus = (p) => <S {...p}><path d="M12 5v14M5 12h14" /></S>;

// Alias usados en los componentes
export const Star = Cross;
export const Beads = Rosary;
export const Users = Praying;
export const Pin = Houses;
export const Book = Bible;
export const Home = Church;
export const Clock = Bell;

export const TYPE_ICON = {
  rosario: Rosary,
  desayuno: Mate,
  salida: Houses,
  caravana: Car,
  procesion: Candle,
  misa: Church,
  comunion: Chalice,
  bautismo: Shell,
  bici: Bike,
  saludo: Moon,
  manto: Virgin,
};
