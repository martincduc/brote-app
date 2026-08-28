import { useState } from 'react';

const INTENTIONS = [
  ['energia', 'Tener más energía', 'Activa tu cuerpo y tu día.'],
  ['calma', 'Vivir con más calma', 'Baja el ruido con pequeños rituales.'],
  ['constancia', 'Ser más constante', 'Hazlo sencillo para poder repetirlo.'],
  ['bienestar', 'Cuidar mi bienestar', 'Cuida lo que te ayuda a sentirte bien.']
];

export default function ProfileSetup({ initialProfile, onSave }) {
  const [name, setName] = useState(initialProfile?.name || '');
  const [intention, setIntention] = useState(initialProfile?.intention || 'bienestar');
  const isEditing = Boolean(initialProfile);

  const submit = event => {
    event.preventDefault();
    const cleanName = name.trim();
    if (cleanName) onSave({ name: cleanName, intention });
  };

  return (
    <div className="profile-screen">
      <div className="profile-sun" />
      <div className="profile-content">
        <div className="profile-mark">brote</div>
        <div className="eyebrow">Tu jardín empieza aquí</div>
        <h1>{isEditing ? 'Tu perfil' : 'Hazlo tuyo desde el primer día'}</h1>
        <p className="profile-intro">Cuéntame un poco de ti. No necesitas crear una cuenta ni compartir tus datos.</p>

        <form onSubmit={submit} className="profile-form">
          <label>
            <span>¿Cómo te llamas?</span>
            <input value={name} onChange={event => setName(event.target.value)} placeholder="Tu nombre" autoFocus maxLength={28} required />
          </label>
          <fieldset>
            <legend>¿Qué quieres cultivar?</legend>
            <div className="intention-grid">
              {INTENTIONS.map(([id, label, description]) => (
                <label className={`intention-option ${intention === id ? 'selected' : ''}`} key={id}>
                  <input type="radio" name="intention" value={id} checked={intention === id} onChange={() => setIntention(id)} />
                  <span><strong>{label}</strong><small>{description}</small></span>
                </label>
              ))}
            </div>
          </fieldset>
          <button className="profile-submit" type="submit">{isEditing ? 'Guardar cambios' : 'Entrar a mi jardín'} <span>→</span></button>
        </form>
        <div className="local-note">Tu perfil se guarda solo en este dispositivo.</div>
      </div>
    </div>
  );
}
