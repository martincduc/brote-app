// Semilla de habitos. hist = ultimos 7 dias (lunes -> domingo), 1 = cumplido.
export const SEED = [
  { id: 'sueno',    name: 'Dormir 7h',    streak: 12, hist: [1, 1, 1, 0, 1, 1, 1], done: true  },
  { id: 'agua',     name: 'Beber agua',   streak: 5,  hist: [1, 0, 1, 1, 1, 0, 1], done: true  },
  { id: 'mover',    name: 'Moverse 30′',  streak: 8,  hist: [1, 1, 0, 1, 1, 1, 0], done: false },
  { id: 'respirar', name: 'Respirar 10′', streak: 21, hist: [1, 1, 1, 1, 1, 1, 1], done: true  },
  { id: 'leer',     name: 'Leer',         streak: 2,  hist: [0, 0, 1, 0, 1, 0, 0], done: false },
  { id: 'diario',   name: 'Escribir',     streak: 0,  hist: [0, 0, 0, 1, 0, 0, 0], done: false }
];

// Que habito alimenta a cual. w = fuerza del vinculo (grosor de la raiz).
export const EDGES = [
  { from: 'sueno',    to: 'mover',    w: 1,   text: 'Dormir 7h alimenta Moverse 30′' },
  { from: 'sueno',    to: 'respirar', w: .8 },
  { from: 'agua',     to: 'mover',    w: .7,  text: 'Beber agua sostiene Moverse 30′' },
  { from: 'respirar', to: 'diario',   w: .55, text: 'Respirar 10′ despierta Escribir' },
  { from: 'mover',    to: 'leer',     w: .4 }
];

// Posiciones (x, y) de cada nodo en el lienzo de raices de 330 x 430.
export const POS = {
  sueno: [48, 34], agua: [236, 26], mover: [132, 182],
  respirar: [268, 168], leer: [62, 326], diario: [228, 318]
};

export const DAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
