import { useState } from 'react';

const STEPS = [
  {
    number: '01', title: 'Cada hábito es una planta',
    text: 'Tu jardín empieza vacío y crece con lo que eliges cuidar. No hay metas perfectas: solo pequeñas acciones que puedas repetir.'
  },
  {
    number: '02', title: 'Riega cuando lo cumplas',
    text: 'Cuando hagas un hábito, desliza su planta hacia arriba. La racha y el clima del jardín se actualizan con tu constancia.'
  },
  {
    number: '03', title: 'Mira lo que te sostiene',
    text: 'En Raíces puedes ver cómo se relacionan tus hábitos. En cualquier momento puedes editar tu lista desde el botón +.'
  }
];

export default function WelcomeTutorial({ onStart, intention }) {
  const focus = { energia: 'energía', calma: 'calma', constancia: 'constancia', bienestar: 'bienestar' }[intention] || 'bienestar';
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const lastStep = step === STEPS.length - 1;

  return (
    <div className="tutorial-screen">
      <div className="tutorial-sun" />
      <div className="tutorial-content">
        <div className="profile-mark">brote</div>
        <div className="tutorial-illustration" aria-hidden="true">
          <div className="tutorial-leaf leaf-one" />
          <div className="tutorial-leaf leaf-two" />
          <div className="tutorial-stem" />
          <div className="tutorial-soil" />
        </div>
        <div className="eyebrow">Cómo florece tu {focus}</div>
        <div className="tutorial-counter">{current.number} / 03</div>
        <h1>{current.title}</h1>
        <p>{current.text}</p>
        <div className="tutorial-dots" aria-label={`Paso ${step + 1} de 3`}>
          {STEPS.map((item, index) => <button key={item.number} className={index === step ? 'active' : ''} onClick={() => setStep(index)} aria-label={`Ir al paso ${index + 1}`} />)}
        </div>
        <button className="profile-submit" onClick={() => lastStep ? onStart() : setStep(step + 1)}>
          {lastStep ? 'Crear mi primer hábito' : 'Siguiente'} <span>→</span>
        </button>
        {!lastStep && <button className="tutorial-skip" onClick={onStart}>Saltar tutorial</button>}
      </div>
    </div>
  );
}
