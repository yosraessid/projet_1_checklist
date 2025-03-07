
import { useState } from 'react';
import { X } from 'lucide-react';
import PropTypes from 'prop-types';
import '../App.css';

function LoginModal({ onClose, onLogin }) {
  /**
   * États locaux pour gérer les champs du formulaire
   */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Gère la soumission du formulaire de connexion
   * @param {Event} e - L'événement de soumission du formulaire
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className="modal-overlay">
      <div className="login-modal">
        {/* En-tête de la modale */}
        <div className="modal-header">
          <h2 className="modal-title">Se connecter</h2>
          <button onClick={onClose} className="close-button">
            <X size={20} />
          </button>
        </div>

        {/* Formulaire de connexion */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Champ email avec aide */}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
              placeholder="exemple@email.com"
            />
            <small className="form-help">
              Emails disponibles : marie.laurent@email.com, thomas.martin@email.com, sophie.dubois@email.com
            </small>
          </div>

          {/* Champ mot de passe */}
          <div className="form-group">
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <button type="submit" className="login-button">
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Validation des props avec PropTypes
LoginModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired
};

export default LoginModal; 