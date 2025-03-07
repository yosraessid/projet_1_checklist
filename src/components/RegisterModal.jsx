
import { useState } from 'react';
import { X } from 'lucide-react';
import PropTypes from 'prop-types';
import '../App.css';


function RegisterModal({ onClose, onRegister }) {
  /**
   * État local pour gérer les données du formulaire
   * @type {{
   *   name: string,
   *   email: string,
   *   password: string,
   *   confirmPassword: string
   * }}
   */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    onRegister(formData);
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal-overlay">
      <div className="register-modal">
        {/* En-tête de la modale */}
        <div className="modal-header">
          <h2 className="modal-title">S&apos;inscrire</h2>
          <button onClick={onClose} className="close-button">
            <X size={20} />
          </button>
        </div>

        {/* Formulaire d'inscription */}
        <form onSubmit={handleSubmit} className="register-form">
          {/* Champ nom complet */}
          <div className="form-group">
            <label className="form-label">Nom complet</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
              placeholder="John Doe"
            />
          </div>

          {/* Champ email */}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
              placeholder="exemple@email.com"
            />
          </div>

          {/* Champ mot de passe */}
          <div className="form-group">
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
              placeholder="••••••••"
            />
          </div>

          {/* Champ confirmation mot de passe */}
          <div className="form-group">
            <label className="form-label">Confirmer le mot de passe</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-input"
              required
              placeholder="••••••••"
            />
          </div>

          {/* Boutons d'action */}
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Annuler
            </button>
            <button type="submit" className="register-button">
              S&apos;inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Validation des props avec PropTypes
RegisterModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired
};

export default RegisterModal; 