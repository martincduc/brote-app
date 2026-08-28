import { EDGES, POS } from '../data.js';
import { leafColor, vitality } from '../theme.js';

export default function RootsScreen({ habits, onBack }) {
  const byId = Object.fromEntries(habits.map(h => [h.id, h]));
  const positionFor = (habit, index) => POS[habit.id] || [38 + (index % 3) * 112, 36 + Math.floor(index / 3) * 150];
  const visibleEdges = EDGES.filter(edge => byId[edge.from] && byId[edge.to]);

  return (
    <>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 70% at 50% 0%, #2c3a30 0%, #18211c 55%, #0f1512 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, color: '#e6efe4' }}>
        <div style={{ padding: '24px 30px 0' }}>
          <div style={{ fontFamily: "'Newsreader', serif", fontSize: 30, fontWeight: 300, lineHeight: 1 }}>raices</div>
          <div style={{ fontSize: 13, opacity: .6, marginTop: 6, maxWidth: 280, lineHeight: 1.5 }}>
            Lo que sostiene a cada planta. Las lineas gruesas son vinculos fuertes esta semana.
          </div>
        </div>

        <div style={{ position: 'relative', width: 330, height: 430, margin: '22px auto 0' }}>
          <svg viewBox="0 0 330 430" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
            {visibleEdges.map((e, i) => {
              const a = POS[e.from] || positionFor(byId[e.from], habits.indexOf(byId[e.from]));
              const b = POS[e.to] || positionFor(byId[e.to], habits.indexOf(byId[e.to]));
              const sa = 34 + vitality(byId[e.from]) * 20;
              const d = `M ${a[0]} ${a[1] + sa} C ${a[0]} ${a[1] + sa + 70}, ${b[0]} ${b[1] - 70}, ${b[0]} ${b[1]}`;
              return (
                <g key={i}>
                  <path d={d} fill="none" stroke="rgba(180,214,180,.16)" strokeWidth={2 + e.w * 7} strokeLinecap="round" />
                  <path d={d} fill="none" stroke="rgba(206,231,190,.75)" strokeWidth={.8 + e.w * 2.2}
                        strokeLinecap="round" strokeDasharray="5 11"
                        style={{ animation: `flow ${5 - e.w * 2}s linear infinite`, opacity: .35 + e.w * .5 }} />
                </g>
              );
            })}
          </svg>

          {habits.map(h => {
            const v = vitality(h), [x, y] = positionFor(h, habits.indexOf(h)), size = 34 + v * 20;
            return (
              <div key={h.id} style={{ position: 'absolute', left: x, top: y, width: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: size, height: size, borderRadius: '50%',
                  background: `radial-gradient(circle at 35% 30%, ${leafColor(Math.min(1, v + .2), 'estable')}, ${leafColor(v, 'noche')})`,
                  border: `1.5px solid ${h.done ? '#e7c98a' : 'rgba(255,255,255,.18)'}`,
                  boxShadow: h.done ? '0 0 22px rgba(231,201,138,.35)' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  animation: `breathe ${5 + v * 3}s ease-in-out infinite`
                }}>
                  <div style={{ width: size * .4, height: size * .28, borderRadius: '0 100% 0 100%', background: 'rgba(255,255,255,.55)', transform: 'rotate(-18deg)' }} />
                </div>
                <div style={{ marginTop: 8, fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' }}>{h.name}</div>
                <div style={{ fontSize: 10, opacity: .5, whiteSpace: 'nowrap' }}>{h.streak} dias</div>
              </div>
            );
          })}
        </div>

        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '0 26px 30px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, padding: '16px 18px', borderRadius: 22, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.09)' }}>
            {visibleEdges.filter(e => e.text).map((e, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 26, height: 1 + e.w * 2.4, borderRadius: 2, background: 'rgba(206,231,190,.8)', flexShrink: 0 }} />
                <div style={{ fontSize: 12, opacity: .85 }}>{e.text}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button onClick={onBack} style={{
              flex: 1, height: 52, borderRadius: 26, background: 'rgba(255,255,255,.1)',
              border: '1px solid rgba(255,255,255,.14)', fontSize: 13, fontWeight: 600
            }}>Volver al jardin</button>
            <div style={{ width: 52, height: 52, borderRadius: '50%', border: '1px solid rgba(255,255,255,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, opacity: .8 }}>⤢</div>
          </div>
        </div>
      </div>
    </>
  );
}
