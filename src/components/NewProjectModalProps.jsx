import { useState } from 'react';
import { X } from 'lucide-react';
import '../App.css';

function NewProjectModal({ onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({
      title,
      description,
      deadline,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="new-project-modal">
        <div className="modal-header">
          <h2 className="modal-title">Nouveau Projet</h2>
          <button onClick={onClose} className="close-button">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="new-project-form">
          <div className="form-group">
            <label className="form-label">Titre</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
              rows={4}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date limite</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Annuler
            </button>
            <button type="submit" className="create-button">
              Créer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewProjectModal;



