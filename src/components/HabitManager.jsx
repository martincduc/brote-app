import { useState } from 'react';
import FlowerIllustration from './FlowerIllustration.jsx';

export default function HabitManager({ habits, intention, onAdd, onRename, onRemove, onToggleDone, onClose, onCreated }) {
  const suggestions = {
    energia: { placeholder: 'Ej. caminar 20 minutos', flower: 'girasol' },
    calma: { placeholder: 'Ej. respirar 5 minutos', flower: 'rosa' },
    constancia: { placeholder: 'Ej. ordenar 10 minutos', flower: 'tulipan' },
    bienestar: { placeholder: 'Ej. beber agua', flower: 'rosa' }
  };
  const suggestion = suggestions[intention] || suggestions.bienestar;
  const [newName, setNewName] = useState('');
  const [frequency, setFrequency] = useState('7');
  const [flower, setFlower] = useState(suggestion.flower);
  const [editing, setEditing] = useState(null);
  const [editName, setEditName] = useState('');

  const add = event => {
    event.preventDefault();
    if (onAdd(newName, frequency, flower)) {
      setNewName('');
      setFrequency('7');
      setFlower(suggestion.flower);
      onCreated?.();
      onClose();
    }
  };

  const saveEdit = event => {
    event.preventDefault();
    if (onRename(editing, editName)) setEditing(null);
  };

  return (
    <div className="manager-backdrop" role="presentation" onClick={onClose}>
      <section className="habit-manager" role="dialog" aria-modal="true" aria-labelledby="manager-title" onClick={event => event.stopPropagation()}>
        <div className="manager-header">
          <div><div className="eyebrow">Tu jardín</div><h2 id="manager-title">Hábitos</h2></div>
          <button className="icon-button" onClick={onClose} aria-label="Cerrar">×</button>
        </div>
        <form id="add-habit-form" className="add-habit" onSubmit={add}>
          <input value={newName} onChange={event => setNewName(event.target.value)} placeholder={suggestion.placeholder} aria-label="Nombre del nuevo hábito" maxLength={32} />
          <select value={frequency} onChange={event => setFrequency(event.target.value)} aria-label="Días por semana">
            {[1, 2, 3, 4, 5, 6, 7].map(days => <option key={days} value={days}>{days} {days === 1 ? 'día' : 'días'}</option>)}
          </select>
        </form>
        <fieldset className="flower-picker">
          <legend>¿Qué quieres plantar?</legend>
          <div className="flower-options">
            {[['rosa', 'Rosa'], ['tulipan', 'Tulipán'], ['girasol', 'Girasol']].map(([id, label]) => (
              <label className={`flower-option ${flower === id ? 'selected' : ''}`} key={id}>
                <input type="radio" name="flower" value={id} checked={flower === id} onChange={() => setFlower(id)} />
                <span className="flower-icon"><FlowerIllustration type={id} /></span><span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="habit-list">
          {habits.map(habit => (
            <div className="habit-row" key={habit.id}>
              {editing === habit.id ? (
                <form className="edit-habit" onSubmit={saveEdit}>
                  <input autoFocus value={editName} onChange={event => setEditName(event.target.value)} aria-label="Editar hábito" maxLength={32} />
                  <button type="submit">Guardar</button>
                </form>
              ) : (
                <>
                  <button className={`done-toggle ${habit.done ? 'is-done' : ''}`} onClick={() => onToggleDone(habit.id)} aria-label={`${habit.done ? 'Deshacer' : 'Completar'} ${habit.name}`}>{habit.done ? '✓' : ''}</button>
                  <div className="habit-copy"><strong>{habit.name}</strong><span>{habit.frequency || 7} días/semana · racha de {habit.streak} días</span></div>
                  <button className="row-action" onClick={() => { setEditing(habit.id); setEditName(habit.name); }}>Editar</button>
                  <button className="row-action danger" onClick={() => onRemove(habit.id)} aria-label={`Eliminar ${habit.name}`}>Eliminar</button>
                </>
              )}
            </div>
          ))}
        </div>
        <button className="manager-close" type="submit" form="add-habit-form">Listo</button>
      </section>
    </div>
  );
}
