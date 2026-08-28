import { useRef, useState } from 'react';
import { leafColor, vitality } from '../theme.js';
import FlowerIllustration from './FlowerIllustration.jsx';

const WATER_THRESHOLD = -42; // px de arrastre hacia arriba para regar

export default function Plant({ habit, index, theme, themeKey, night, pulsing, onWater }) {
  const [dy, setDy] = useState(0);
  const start = useRef(null);

  const v = vitality(habit);
  const col = leafColor(v, themeKey);
  const drag = Math.max(-90, Math.min(0, dy));
  const lift = Math.min(14, -drag * .16);
  const stemH = 34 + v * 84;
  const droop = 0;
  const budSize = 11 + v * 15;
  const flower = habit.flower || 'rosa';
  const flowerColors = { rosa: '#d86f72', tulipan: '#e88c55', girasol: '#efc84f' };
  const flowerColor = flowerColors[flower] || flowerColors.rosa;

  const leaves = Array.from({ length: 2 + Math.round(v * 3) }, (_, k) => {
    const side = k % 2 ? 1 : -1;
    const rot = side * (22 - v * 8) - droop;
    return (
      <div key={k} style={{
        position: 'absolute', bottom: stemH * (.22 + k * .17), left: '50%',
        width: 15 + v * 17, height: 10 + v * 9,
        background: col, borderRadius: '0 100% 0 100%',
        transformOrigin: side > 0 ? 'left center' : 'right center',
        transform: `translateX(${side > 0 ? '0' : '-100%'}) rotate(${rot}deg)`,
        animation: `sway ${3.6 + k * .35}s ease-in-out ${k * .4}s infinite`,
        opacity: night ? .8 : .55 + v * .45,
        transition: 'all .8s cubic-bezier(.4,0,.2,1)'
      }} />
    );
  });

  const onDown = e => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    start.current = e.clientY;
  };
  const onMove = e => { if (start.current !== null) setDy(e.clientY - start.current); };
  const onUp = () => {
    if (start.current !== null && dy < WATER_THRESHOLD) onWater(habit.id);
    start.current = null;
    setDy(0);
  };

  return (
    <div
      onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
      role="button" aria-label={`Regar ${habit.name}`}
      style={{
        position: 'relative', height: 194, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-end',
        touchAction: 'none', cursor: 'grab', userSelect: 'none'
      }}>

      <div style={{
        position: 'absolute', bottom: 6, left: '50%', width: 70, height: 70, marginLeft: -35,
        borderRadius: '50%', border: `2px solid ${theme.glow}`, pointerEvents: 'none',
        opacity: pulsing ? 1 : 0, animation: pulsing ? 'ripple 1.1s ease-out' : 'none'
      }} />

      <div style={{
        position: 'absolute', top: 6, left: '50%', width: 12, height: 15, marginLeft: -6,
        borderRadius: '50% 50% 50% 50% / 68% 68% 32% 32%', background: '#8fc6de',
        boxShadow: '0 0 12px rgba(143,198,222,.7)', pointerEvents: 'none',
        transform: `translateY(${Math.max(0, 30 + drag * .5)}px) scale(${drag < -8 ? 1 : .3})`,
        opacity: drag < -8 ? Math.min(1, -drag / 45) : 0, transition: 'opacity .2s ease'
      }} />

      <div style={{
        position: 'relative', width: 70, height: stemH + budSize,
        transform: `translateY(${-lift}px) scale(${1 + lift * .004})`,
        transition: start.current !== null ? 'none' : 'transform .7s cubic-bezier(.34,1.3,.5,1)',
        filter: night ? 'saturate(.7) brightness(.8)' : 'none'
      }}>
        <div style={{
          position: 'absolute', bottom: 0, left: '50%', width: 3 + v * 2.4, height: stemH,
          marginLeft: -(1.5 + v * 1.2), borderRadius: 3, transformOrigin: 'bottom center',
          transform: `rotate(${droop}deg)`,
          background: `linear-gradient(to top, ${leafColor(Math.max(.15, v - .25), themeKey)}, ${col})`,
          transition: 'all .8s cubic-bezier(.4,0,.2,1)'
        }} />
        {leaves}
        <div className={`plant-bloom ${flower}`} style={{
          position: 'absolute', bottom: stemH - budSize * .35, left: '50%',
          width: budSize, height: budSize, marginLeft: 0,
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          background: habit.done ? theme.glow : flowerColor,
          boxShadow: habit.done ? `0 0 ${10 + v * 16}px ${theme.glow}88` : 'none',
          transform: `translateX(-50%) rotate(${droop}deg)`,
          animation: habit.done ? 'breathe 4.5s ease-in-out infinite' : 'none',
          transition: 'all .8s cubic-bezier(.4,0,.2,1)'
        }}>
          <FlowerIllustration type={flower} />
        </div>
      </div>

      <div style={{
        width: 44 + v * 22, height: 11, borderRadius: '50%', marginTop: -4,
        background: theme.soil, opacity: night ? .5 : .32, filter: 'blur(1px)', transition: 'all .8s ease'
      }} />

      <div style={{ marginTop: 9, textAlign: 'center', lineHeight: 1.25 }}>
        <div style={{ fontSize: 12, fontWeight: 600 }}>{habit.name}</div>
        <div style={{ fontSize: 10.5, opacity: .55, marginTop: 2 }}>
          {habit.streak === 0 ? 'sin regar' : `${habit.streak} dias${habit.done ? ' · regada' : ''}`}
        </div>
      </div>
    </div>
  );
}
