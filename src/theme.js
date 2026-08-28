export const THEMES = {
  floreciendo: { sky: 'linear-gradient(180deg,#fdf0dc 0%,#f6ead0 32%,#e6efd4 68%,#dbe9cd 100%)', glow: '#f7c778', ink: '#33361f', soil: '#7b5c3e', cloud: 0,   chroma: 1   },
  estable:     { sky: 'linear-gradient(180deg,#f1f1e8 0%,#e9ede1 40%,#e0e8dc 100%)',              glow: '#e7dcc0', ink: '#333828', soil: '#6a5946', cloud: .35, chroma: .82 },
  nublado:     { sky: 'linear-gradient(180deg,#e2e5e5 0%,#dadfdd 45%,#d2d8d5 100%)',              glow: '#c9d0cd', ink: '#3a3e3c', soil: '#575450', cloud: .85, chroma: .55 },
  noche:       { sky: 'linear-gradient(180deg,#1b2331 0%,#161d29 45%,#101720 100%)',              glow: '#43597f', ink: '#dde7f2', soil: '#161c25', cloud: .2,  chroma: .5  }
};

/** Vitalidad 0-1: mezcla de racha larga (45%) y consistencia reciente (55%). */
export function vitality(habit) {
  const consistency = habit.hist.reduce((a, b) => a + b, 0) / Math.max(1, habit.frequency || 7);
  return Math.max(.08, Math.min(1, .45 * Math.min(habit.streak / 21, 1) + .55 * consistency));
}

/** Cumplimiento semanal real: acciones hechas frente al objetivo de cada hábito. */
export function gardenScore(habits) {
  if (!habits.length) return 0;
  const completed = habits.reduce((total, habit) => total + habit.hist.reduce((a, b) => a + b, 0), 0);
  const target = habits.reduce((total, habit) => total + Math.max(1, habit.frequency || 7), 0);
  return Math.min(1, completed / target);
}

export function themeKeyFor({ habits, night, mood }) {
  if (night) return 'noche';
  if (mood && mood !== 'auto') return mood;
  const s = gardenScore(habits);
  return s > .68 ? 'floreciendo' : s > .42 ? 'estable' : 'nublado';
}

/** Verde vivo derivado de la vitalidad; el tema desatura en semanas flojas. */
export function leafColor(v, themeKey) {
  const night = themeKey === 'noche';
  const L = (night ? .42 : .58) + .16 * v;
  const C = (.05 + .13 * v) * THEMES[themeKey].chroma;
  return `oklch(${L} ${C} ${142 - 14 * v})`;
}
