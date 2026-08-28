import { useEffect, useState } from 'react';
import { DAYS } from '../data.js';
import { gardenScore } from '../theme.js';
import Plant from './Plant.jsx';

const FIREFLIES = [[60, 300], [300, 360], [140, 470], [250, 540], [90, 600], [330, 250]];
const INTENTION_LABELS = {
  energia: 'más energía', calma: 'más calma', constancia: 'más constancia', bienestar: 'tu bienestar'
};
const WEEKDAY_NAMES = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
const FOCUS_LINES = {
  energia: 'Tu siguiente paso: activa el cuerpo, aunque sean diez minutos.',
  calma: 'Tu siguiente paso: regálate un momento sin prisa.',
  constancia: 'Tu siguiente paso: repite algo pequeño hoy.',
  bienestar: 'Tu siguiente paso: cuida una cosa que te haga bien.'
};

export default function GardenScreen({ habits, theme, themeKey, night, pulse, water, profile, onRoots, onManage, onProfile, onToggleNight }) {
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const score = gardenScore(habits);
  const todayIndex = (new Date().getDay() + 6) % 7;
  const todayName = WEEKDAY_NAMES[todayIndex];
  const consistentDayNames = habits.length
    ? WEEKDAY_NAMES.filter((_, index) => habits.every(habit => habit.hist[index] === 1))
    : [];
  const moodLine = night ? 'Buenas noches · el jardin descansa'
    : themeKey === 'floreciendo' ? 'Semana del 24 · luz plena'
    : themeKey === 'estable' ? 'Semana del 24 · cielo templado'
    : 'Semana del 24 · algo nublado';
  const welcomeLine = night ? 'Buenas noches · el jardin descansa' : `Hola, ${profile.name} · cultivando ${INTENTION_LABELS[profile.intention] || 'tu bienestar'}`;
  const focusLine = FOCUS_LINES[profile.intention] || FOCUS_LINES.bienestar;
  const timeLabel = currentTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div style={{ position: 'absolute', inset: 0, background: theme.sky, transition: 'background 1.2s ease' }} />
      <div style={{
        position: 'absolute', top: 96, right: 42, width: 96, height: 96, borderRadius: '50%',
        background: theme.glow, filter: 'blur(26px)',
        opacity: night ? .5 : .7 - theme.cloud * .35, transition: 'all 1.2s ease'
      }} />
      <div style={{
        position: 'absolute', top: 86, right: 24, width: 150, height: 56, borderRadius: 40,
        background: '#fff', opacity: night ? .04 : theme.cloud * .55, filter: 'blur(12px)',
        animation: 'drift 14s ease-in-out infinite', transition: 'opacity 1.2s ease'
      }} />

      <div style={{ position: 'absolute', inset: 0, opacity: night ? 1 : 0, transition: 'opacity 1.4s ease', pointerEvents: 'none' }}>
        {FIREFLIES.map(([x, y], i) => (
          <div key={i} style={{
            position: 'absolute', left: x, top: y, width: 4, height: 4, borderRadius: '50%',
            background: '#f4e2a8', boxShadow: '0 0 10px #f4e2a8',
            animation: `firefly ${4 + i * .7}s ease-in-out ${i * .5}s infinite`
          }} />
        ))}
      </div>

      <div style={{ position: 'absolute', inset: 0, color: theme.ink, transition: 'color 1.2s ease' }}>
        <div style={{ padding: '22px 30px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontFamily: "'Newsreader', serif", fontSize: 30, fontWeight: 300, lineHeight: 1 }}>brote</div>
            <div style={{ fontSize: 13, opacity: .6, marginTop: 6 }}>{welcomeLine}</div>
            <div style={{ fontSize: 11, opacity: .48, marginTop: 5 }}>Hoy es {todayName}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: "'Newsreader', serif", fontSize: 26, lineHeight: 1 }}>{Math.round(score * 100)}%</div>
            <div style={{ fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', opacity: .5, marginTop: 4 }}>semana</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 7, padding: '20px 30px 0', alignItems: 'center' }}>
          {DAYS.map((d, i) => {
            const filled = habits.length ? habits.reduce((a, h) => a + h.hist[i], 0) / habits.length : 0;
            return (
              <div key={d} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: '100%', height: 6 + filled * 16, borderRadius: 4,
                  background: filled > .6 ? theme.glow : 'currentColor',
                  opacity: filled > .6 ? .95 : .12 + filled * .4, transition: 'all .6s ease',
                  outline: i === todayIndex ? '2px solid currentColor' : 'none', outlineOffset: 3
                }} />
                <div style={{ fontSize: 10, fontWeight: i === todayIndex ? 700 : 400, opacity: i === todayIndex ? .9 : .45 }}>{d}</div>
              </div>
            );
          })}
        </div>

        <div className="garden-bed" aria-hidden="true">
          <div className="garden-bed-back" />
          <div className="garden-bed-front" />
          <div className="grass-blades">
            {Array.from({ length: 18 }, (_, index) => <span key={index} style={{ left: `${index * 6 - 2}%`, height: `${8 + (index % 4) * 3}px`, transform: `rotate(${index % 2 ? 18 : -18}deg)` }} />)}
          </div>
          <span className="garden-pebble pebble-one" />
          <span className="garden-pebble pebble-two" />
          <span className="garden-pebble pebble-three" />
          <span className="garden-sprout sprout-one" />
          <span className="garden-sprout sprout-two" />
        </div>

        <div className="plant-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', alignItems: 'end', padding: '18px 18px 0', gap: 2 }}>
          {habits.map((h, i) => (
            <Plant key={h.id} habit={h} index={i} theme={theme} themeKey={themeKey}
                   night={night} pulsing={pulse === h.id} onWater={water} />
          ))}
        </div>

        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: 168, pointerEvents: 'none',
          background: `linear-gradient(180deg, transparent 0%, ${theme.soil}22 40%, ${theme.soil}55 100%)`,
          transition: 'background 1.2s ease'
        }} />

        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '0 26px 30px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ textAlign: 'center', fontSize: 11, opacity: .58 }}>
            {habits.length
              ? consistentDayNames.length ? `Constantes: ${consistentDayNames.join(', ')}` : 'Aún no hay días completos esta semana'
              : 'Añade un hábito para empezar a medir tu constancia'}
          </div>
          {!night && <div style={{ textAlign: 'center', fontSize: 11, opacity: .58 }}>{focusLine}</div>}
          <div style={{ textAlign: 'center', fontSize: 12, opacity: .6 }}>
            {night ? 'Sin recordatorios. Manana amanece a las 6:40.' : habits.length ? 'Desliza una planta hacia arriba para regarla' : 'Tu jardín está listo para empezar'}
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button onClick={onProfile} aria-label="Editar perfil" style={{
              width: 52, height: 52, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, background: night ? 'rgba(255,255,255,.08)' : 'rgba(255,255,255,.42)', border: '1px solid rgba(0,0,0,.06)'
            }}>☺</button>
            <button onClick={onManage} aria-label="Gestionar hábitos" style={{
              width: 52, height: 52, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 23, background: night ? 'rgba(255,255,255,.08)' : 'rgba(255,255,255,.42)', border: '1px solid rgba(0,0,0,.06)'
            }}>+</button>
            <button onClick={onRoots} style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, height: 52,
              borderRadius: 26, background: night ? 'rgba(255,255,255,.08)' : 'rgba(255,255,255,.42)',
              border: '1px solid rgba(0,0,0,.06)', backdropFilter: 'blur(8px)', transition: 'all .6s ease'
            }}>
              <div style={{ width: 9, height: 9, borderRadius: '50%', border: '1.5px solid currentColor' }} />
              <span style={{ fontSize: 13, fontWeight: 600 }}>Ver raices</span>
              <span style={{ fontSize: 11, opacity: .5 }}>pellizca</span>
            </button>
            <button onClick={onToggleNight} aria-label="Hibernacion" style={{
              width: 52, height: 52, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 17, transition: 'all .6s ease',
              background: night ? theme.glow + '33' : 'rgba(255,255,255,.42)', border: '1px solid rgba(0,0,0,.06)'
            }}>{night ? '☀' : '☾'}</button>
          </div>
        </div>

        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: 16, padding: '0 40px', color: '#e4ecf6',
          background: 'linear-gradient(180deg, rgba(16,22,32,.72), rgba(12,16,24,.94))',
          opacity: night ? 1 : 0, pointerEvents: 'none', transition: 'opacity 1.4s ease'
        }}>
          <div style={{ fontFamily: "'Newsreader', serif", fontSize: 27, fontWeight: 300, lineHeight: 1.3, textAlign: 'center' }}>
            El jardin<br />se cierra
          </div>
          <div style={{ fontSize: 13, opacity: .65, textAlign: 'center', maxWidth: 230, lineHeight: 1.55 }}>
            {habits.filter(h => h.done).length} habitos regados hoy. Lo demas puede esperar al amanecer.
          </div>
          <div style={{ fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', opacity: .4 }}>hibernacion · {timeLabel}</div>
        </div>
      </div>
    </>
  );
}
