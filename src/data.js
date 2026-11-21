// Cronograma Fiestas Patronales 2026 — Nuestra Señora del Valle
// Fuente: "Cronograma fiestas patronales 2026.pdf"

export const LEMA = 'Bajo tu manto Madre, anunciemos y abracemos nuestra historia';

const ev = (time, type, title, detail = '', extra = {}) => ({ time, type, title, detail, ...extra });

const manana = (barrio) => [
  ev('07:00', 'rosario', 'Rezo del Santo Rosario'),
  ev('07:30', 'desayuno', 'Desayuno comunitario'),
  ev('08:00', 'salida', 'Salida con las imágenes', `Hacia el B° ${barrio}`),
];
const procesion = () => ev('19:00', 'procesion', 'Procesión', 'Desde el barrio hacia la parroquia');
const misa = (detail = '', extra = {}) => ev('20:00', 'misa', 'Santa Misa', detail, extra);

export const DAYS = [
  {
    id: 'd29', date: '2026-11-29', weekday: 'Domingo', num: '29', month: 'noviembre',
    intention: 'Por la comunidad parroquial',
    group: 'Catequesis General',
    barrio: 'Cerco Ingenio y Colonia 1',
    invited: 'Todas las comunidades pertenecientes a la parroquia',
    liturgy: 'Todas las capillas',
    events: [
      ...manana('Cerco Ingenio y Colonia 1'),
      ev('18:30', 'caravana', 'Caravana', 'Desde Llona hasta la parroquia', { special: true }),
      procesion(),
      misa(),
    ],
  },
  {
    id: 'd30', date: '2026-11-30', weekday: 'Lunes', num: '30', month: 'noviembre',
    intention: 'Por los peregrinos',
    group: 'Grupo de Oración',
    barrio: 'Tres Luces',
    invited: 'María Auxiliadora y Ntra. Sra. del Rosario de Nueva Pompeya',
    liturgy: 'Comunidades invitadas',
    events: [...manana('Tres Luces'), procesion(), misa()],
  },
  {
    id: 'd01', date: '2026-12-01', weekday: 'Martes', num: '01', month: 'diciembre',
    intention: 'Por los enfermos',
    group: 'Divina Misericordia',
    barrio: 'El Bosque',
    invited: 'Ntra. Sra. del Carmen',
    liturgy: 'Comunidad invitada',
    events: [...manana('El Bosque'), procesion(), misa()],
  },
  {
    id: 'd02', date: '2026-12-02', weekday: 'Miércoles', num: '02', month: 'diciembre',
    intention: 'Acción de gracias por la vida',
    group: 'Consagradas',
    barrio: 'La Flor y Colonia 3',
    invited: 'Ntra. Sra. de la Merced (Fortín)',
    liturgy: 'Comunidad invitada',
    events: [
      ...manana('La Flor y Colonia 3'),
      procesion(),
      misa('Bendición a las embarazadas y ancianos', { special: true }),
    ],
  },
  {
    id: 'd03', date: '2026-12-03', weekday: 'Jueves', num: '03', month: 'diciembre',
    intention: 'Por el trabajo',
    group: 'Sacristía',
    barrio: 'Quilmes',
    invited: 'Asunción y San Roque',
    liturgy: 'Comunidad invitada',
    events: [
      ...manana('Quilmes'),
      procesion(),
      misa('Bendición a los trabajadores y petición por los que no lo tienen', { special: true }),
    ],
  },
  {
    id: 'd04', date: '2026-12-04', weekday: 'Viernes', num: '04', month: 'diciembre',
    intention: 'Por las vocaciones sacerdotales y religiosas',
    group: 'Cáritas',
    barrio: 'Avenida y Privado',
    invited: 'Sagrado Corazón',
    liturgy: 'Comunidad invitada',
    events: [
      ...manana('Avenida y Privado'),
      ev('12:00', 'rosario', 'Rezo de las mil Ave María', '', { special: true }),
      procesion(),
      misa(),
    ],
  },
  {
    id: 'd05', date: '2026-12-05', weekday: 'Sábado', num: '05', month: 'diciembre',
    intention: 'Por los jóvenes',
    group: 'Jóvenes Parroquial',
    barrio: 'La Cancha, 40 Viviendas y Victorino',
    invited: 'Ntra. Sra. de Luján y Ntra. Sra. de la Merced (Colonia Mercedes)',
    liturgy: 'Comunidades invitadas',
    events: [
      ...manana('La Cancha, 40 Viviendas y Victorino'),
      ev('10:00', 'bautismo', 'Celebración de Bautismos', '', { special: true }),
      procesion(),
      misa(),
    ],
  },
  {
    id: 'd06', date: '2026-12-06', weekday: 'Domingo', num: '06', month: 'diciembre',
    intention: 'Por los niños y sus familias',
    group: 'Coro Sede, Niños y Adultos',
    barrio: 'La Villa',
    invited: null,
    liturgy: 'Catequesis de niños y Ejército Blanco',
    events: [
      ...manana('La Villa'),
      ev('19:00', 'procesion', 'Procesión de Niños', 'Desde Longo', { special: true }),
      procesion(),
      misa(),
    ],
  },
  {
    id: 'd07', date: '2026-12-07', weekday: 'Lunes', num: '07', month: 'diciembre',
    intention: 'Por los difuntos',
    group: 'Todos los grupos',
    barrio: 'La Boca',
    invited: null,
    liturgy: 'Todos los grupos (Sede)',
    events: [
      ...manana('La Boca'),
      ev('10:00', 'manto', 'Vestición · Cambio de manto', 'A Ntra. Sra. del Valle', { special: true }),
      procesion(),
      misa(),
      ev('22:30', 'bici', 'Bicicleteada', 'Víspera de la fiesta', { special: true }),
      ev('00:00', 'saludo', 'Saludo a Ntra. Sra. del Valle', 'Medianoche del 8 de diciembre', { special: true, nextDay: true }),
    ],
  },
  {
    id: 'd08', date: '2026-12-08', weekday: 'Martes', num: '08', month: 'diciembre',
    feast: true,
    intention: 'Solemnidad de la Pura y Limpia Concepción del Valle',
    group: null,
    barrio: null,
    invited: 'Toda la comunidad',
    liturgy: null,
    events: [
      ev('08:30', 'comunion', 'Santa Misa de Primeras Comuniones', '', { special: true }),
      ev('10:30', 'comunion', 'Santa Misa de Primeras Comuniones', '', { special: true }),
      ev('18:30', 'saludo', 'Concentración y animación', '', { special: true }),
      ev('19:00', 'procesion', 'Solemne procesión', 'Con Nuestra Madre del Valle', { special: true }),
      ev(null, 'misa', 'Santa Misa', 'Al finalizar la procesión', { special: true, culmination: true, label: 'Al finalizar' }),
    ],
  },
];

export const FEAST = DAYS[DAYS.length - 1];
export const VIGIL = DAYS[DAYS.length - 2].events.filter((e) => e.time === '22:30' || e.nextDay);

/** Barrios y lugares que visitan las imágenes, para el buscador */
const splitBarrios = (s) => s.split(/, | y /).map((x) => x.trim()).filter(Boolean);
export const PLACES = [
  ...DAYS.flatMap((d, dayIndex) =>
    d.barrio
      ? splitBarrios(d.barrio).map((name) => ({ name, dayIndex, kind: 'barrio', others: splitBarrios(d.barrio).filter((n) => n !== name) }))
      : []
  ),
  { name: 'Llona', dayIndex: 0, kind: 'caravana' },
  { name: 'Longo', dayIndex: 7, kind: 'ninos' },
];

export const ROUTINE = [
  { time: '07:00', title: 'Rezo del Santo Rosario', type: 'rosario' },
  { time: '07:30', title: 'Desayuno comunitario', type: 'desayuno' },
  { time: '08:00', title: 'Salida con las imágenes', type: 'salida' },
  { time: '19:00', title: 'Procesión hacia la parroquia', type: 'procesion' },
  { time: '20:00', title: 'Santa Misa', type: 'misa' },
];
