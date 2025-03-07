
import { useState } from 'react';
import { X } from 'lucide-react';
import PropTypes from 'prop-types';
import '../App.css';


function NewProjectModal({ onClose, onCreate }) {
  /**
   * État local pour gérer les données du formulaire
   * @type {{
   *   title: string,
   *   description: string,
   *   deadline: string
   * }}
   */
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: ''
  });

  /**
   * Met à jour l'état du formulaire lors de la modification des champs
   * @param {Event} e - L'événement de changement d'un champ
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Gère la soumission du formulaire de création
   * @param {Event} e - L'événement de soumission du formulaire
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="new-project-modal">
        {/* En-tête de la modale */}
        <div className="modal-header">
          <h2 className="modal-title">Nouveau Projet</h2>
          <button onClick={onClose} className="close-button">
            <X size={20} />
          </button>
        </div>

        {/* Formulaire de création de projet */}
        <form onSubmit={handleSubmit} className="new-project-form">
          {/* Champ titre */}
          <div className="form-group">
            <label className="form-label">Titre du projet</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              required
              placeholder="Entrez le titre du projet"
            />
          </div>

          {/* Zone de texte description */}
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
              required
              placeholder="Décrivez votre projet..."
              rows={4}
            />
          </div>

          {/* Sélecteur de date limite */}
          <div className="form-group">
            <label className="form-label">Date limite</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="form-input"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Boutons d'action */}
          <div className="modal-actions">
            <button 
              type="button" 
              onClick={onClose} 
              className="cancel-button"
            >
              Annuler
            </button>
            <button 
              type="submit" 
              className="create-button"
            >
              Créer le projet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Validation des props avec PropTypes
NewProjectModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired
};

export default NewProjectModal;



