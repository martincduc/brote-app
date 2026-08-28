import { useCallback, useEffect, useRef, useState } from 'react';
import { themeKeyFor, THEMES } from './theme.js';

const STORAGE_KEY = 'brote.garden.v2';

const todayKey = () => new Date().toISOString().slice(0, 10);
const currentDayIndex = () => (new Date().getDay() + 6) % 7;
const freshHabits = () => [];

function loadGarden() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved)) return { habits: saved, lastDate: todayKey() };
    if (saved?.habits) {
      const daysAway = Math.max(0, Math.min(7, Math.round((Date.parse(todayKey()) - Date.parse(saved.lastDate)) / 86400000)));
      return {
        habits: saved.habits.map(h => ({
          ...h,
          frequency: Math.max(1, Math.min(7, h.frequency || 7)),
          flower: h.flower || 'rosa',
          hist: daysAway ? [...h.hist.slice(daysAway), ...Array(daysAway).fill(0)].slice(-7) : h.hist,
          done: daysAway ? false : h.done
        })),
        lastDate: todayKey()
      };
    }
  } catch {}
  return { habits: freshHabits(), lastDate: todayKey() };
}

export function useGarden() {
  const [garden, setGarden] = useState(loadGarden);
  const habits = garden.habits;
  const setHabits = updater => setGarden(current => ({
    ...current,
    habits: typeof updater === 'function' ? updater(current.habits) : updater
  }));
  const [night, setNight] = useState(false);
  const [mood, setMood] = useState('auto');
  const [view, setView] = useState('garden'); // 'garden' | 'roots'
  const [pulse, setPulse] = useState(null);
  const timer = useRef(null);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ habits, lastDate: todayKey() })); } catch {}
  }, [habits]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const water = useCallback(id => {
    const dayIndex = currentDayIndex();
    setHabits(hs => hs.map(h =>
      h.id === id && !h.done
        ? { ...h, done: true, streak: h.streak + 1, hist: h.hist.map((value, index) => index === dayIndex ? 1 : value) }
        : h
    ));
    setPulse(id);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setPulse(null), 1100);
  }, []);

  const reset = useCallback(() => setHabits(freshHabits()), []);

  const addHabit = useCallback((name, frequency, flower) => {
    const cleanName = name.trim();
    if (!cleanName) return false;
    setHabits(current => [...current, { id: `habit-${Date.now()}`, name: cleanName, frequency: Math.max(1, Math.min(7, Number(frequency) || 7)), flower: flower || 'rosa', streak: 0, hist: [0, 0, 0, 0, 0, 0, 0], done: false }]);
    return true;
  }, []);

  const renameHabit = useCallback((id, name) => {
    const cleanName = name.trim();
    if (!cleanName) return false;
    setHabits(current => current.map(h => h.id === id ? { ...h, name: cleanName } : h));
    return true;
  }, []);

  const removeHabit = useCallback(id => setHabits(current => current.filter(h => h.id !== id)), []);

  const toggleDone = useCallback(id => setHabits(current => current.map(h => {
    if (h.id !== id) return h;
    const done = !h.done;
    const dayIndex = currentDayIndex();
    return { ...h, done, streak: Math.max(0, h.streak + (done ? 1 : -1)), hist: h.hist.map((value, index) => index === dayIndex ? (done ? 1 : 0) : value) };
  })), []);

  const themeKey = themeKeyFor({ habits, night, mood });
  return { habits, water, reset, addHabit, renameHabit, removeHabit, toggleDone, night, setNight, mood, setMood, view, setView, pulse, themeKey, theme: THEMES[themeKey] };
}
