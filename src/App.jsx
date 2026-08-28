import { useEffect, useRef, useState } from 'react';
import GardenScreen from './components/GardenScreen.jsx';
import RootsScreen from './components/RootsScreen.jsx';
import HabitManager from './components/HabitManager.jsx';
import ProfileSetup from './components/ProfileSetup.jsx';
import WelcomeTutorial from './components/WelcomeTutorial.jsx';
import AppTour from './components/AppTour.jsx';
import { useGarden } from './useGarden.js';

const PROFILE_KEY = 'brote.profile.v2';
const TUTORIAL_KEY = 'brote.tutorial.v1';
const TOUR_KEY = 'brote.tour.v1';

export default function App() {
  const g = useGarden();
  const screenRef = useRef(null);
  const [managing, setManaging] = useState(false);
  const [profile, setProfile] = useState(() => {
    try { return JSON.parse(localStorage.getItem(PROFILE_KEY)); } catch { return null; }
  });
  const [tutorialDone, setTutorialDone] = useState(() => localStorage.getItem(TUTORIAL_KEY) === 'true');
  const [editingProfile, setEditingProfile] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const setView = g.setView;

  const saveProfile = nextProfile => {
    setProfile(nextProfile);
    setEditingProfile(false);
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify(nextProfile)); } catch {}
  };

  const startGarden = () => {
    setTutorialDone(true);
    setManaging(true);
    try { localStorage.setItem(TUTORIAL_KEY, 'true'); } catch {}
  };

  const handleCreated = () => {
    if (g.habits.length === 0 && localStorage.getItem(TOUR_KEY) !== 'true') setTourOpen(true);
  };

  // Pinch-to-zoom-out real: dos dedos acercandose abren la vista de raices.
  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;
    const pts = new Map();
    let base = null;
    const dist = () => {
      const [a, b] = [...pts.values()];
      return Math.hypot(a.x - b.x, a.y - b.y);
    };
    const down = e => { pts.set(e.pointerId, { x: e.clientX, y: e.clientY }); if (pts.size === 2) base = dist(); };
    const move = e => {
      if (!pts.has(e.pointerId)) return;
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pts.size === 2 && base) {
        const ratio = dist() / base;
        if (ratio < .75) { setView('roots'); base = null; }
        if (ratio > 1.35) { setView('garden'); base = null; }
      }
    };
    const up = e => { pts.delete(e.pointerId); base = null; };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    return () => {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
    };
  }, [setView]);

  return (
    <div className="brote-desk" style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', gap: 28, padding: '48px 24px'
    }}>
      <div className="brote-bezel" style={{
        position: 'relative', width: 390, height: 844, borderRadius: 48,
        background: '#15130f', padding: 11,
        boxShadow: '0 40px 80px -30px rgba(40,35,25,.5)'
      }}>
        <div ref={screenRef} className="brote-screen" style={{
          position: 'relative', width: 390, height: 844, borderRadius: 38,
          overflow: 'hidden', background: '#e9eade'
        }}>
          {!profile || editingProfile ? <ProfileSetup initialProfile={editingProfile ? profile : null} onSave={saveProfile} />
          : !tutorialDone ? <WelcomeTutorial intention={profile.intention} onStart={startGarden} />
          : g.view === 'garden'
            ? <GardenScreen habits={g.habits} theme={g.theme} themeKey={g.themeKey} night={g.night}
                pulse={g.pulse} water={g.water}
                profile={profile} onRoots={() => setView('roots')} onManage={() => setManaging(true)} onProfile={() => setEditingProfile(true)} onToggleNight={() => g.setNight(n => !n)} />
            : <RootsScreen habits={g.habits} onBack={() => setView('garden')} />}
        </div>
      </div>

      {managing && <HabitManager habits={g.habits} intention={profile?.intention} onAdd={g.addHabit} onRename={g.renameHabit} onRemove={g.removeHabit} onToggleDone={g.toggleDone} onCreated={handleCreated} onClose={() => setManaging(false)} />}
      {tourOpen && <AppTour onNavigate={setView} onFinish={() => { setTourOpen(false); localStorage.setItem(TOUR_KEY, 'true'); }} />}
    </div>
  );
}
