import { useState } from 'react';

const STEPS = [
  ['Tu jardín', 'Aquí aparecerá tu planta. Cada vez que cumplas el hábito, riégala deslizando hacia arriba.', 'garden'],
  ['Tu progreso', 'Este porcentaje compara tus cumplimientos con los días por semana que elegiste para cada hábito.', 'progress'],
  ['Tus raíces', 'Abre esta vista para descubrir cómo se conectan tus hábitos y qué sostiene tu constancia.', 'roots'],
  ['Siempre puedes cambiarlo', 'Usa el botón + para añadir hábitos, editar los que ya tienes o ajustar tu jardín.', 'manage']
];

export default function AppTour({ onFinish, onNavigate }) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const next = () => step === STEPS.length - 1 ? onFinish() : setStep(step + 1);

  return (
    <div className="tour-backdrop" role="presentation">
      <section className="app-tour" role="dialog" aria-modal="true" aria-labelledby="tour-title">
        <div className="tour-progress"><span style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} /></div>
        <div className="eyebrow">Paseo por Brote · {step + 1} de {STEPS.length}</div>
        <div className={`tour-orbit tour-${current[2]}`}><span>✦</span></div>
        <h2 id="tour-title">{current[0]}</h2>
        <p>{current[1]}</p>
        <div className="tour-actions">
          {step > 0 && <button className="tour-back" onClick={() => setStep(step - 1)}>Atrás</button>}
          {step === 2 && <button className="tour-link" onClick={() => { onNavigate('roots'); onFinish(); }}>Ver raíces</button>}
          <button className="profile-submit" onClick={next}>{step === STEPS.length - 1 ? 'Empezar' : 'Siguiente'} <span>→</span></button>
        </div>
        {step < STEPS.length - 1 && <button className="tour-skip" onClick={onFinish}>Saltar paseo</button>}
      </section>
    </div>
  );
}
