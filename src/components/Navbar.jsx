// Navbar.jsx
import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import '../App.css';

const Navbar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  
  // Initialiser l'état de connexion depuis localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  
  // Initialiser les données utilisateur depuis localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Sauvegarder l'état de connexion dans localStorage
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  // Sauvegarder les données utilisateur dans localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Tableau d'avatars disponibles
  const avatars = {
    'marie.laurent@email.com': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    'thomas.martin@email.com': 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150',
    'sophie.dubois@email.com': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    'default': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
  };

  const handleLogin = (credentials) => {
    // Sélectionner l'avatar correspondant à l'email ou utiliser l'avatar par défaut
    const userAvatar = avatars[credentials.email] || avatars.default;
    
    const mockUser = {
      email: credentials.email,
      avatar: userAvatar
    };
    
    setUser(mockUser);
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
  };

  const handleRegister = (userData) => {
    // Utiliser l'avatar correspondant à l'email ou l'avatar par défaut
    const userAvatar = avatars[userData.email] || avatars.default;
    
    const newUser = {
      ...userData,
      avatar: userAvatar
    };
    
    setUser(newUser);
    setIsLoggedIn(true);
    setIsRegisterModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    localStorage.setItem('isLoggedIn', 'false');
  };

  return (
    <nav>
      <div className="logo">
        <Users className="h-8 w-8 text-indigo-600" />
        MultimédiaTeams
      </div>
      <div className="buttons">
        {isLoggedIn ? (
          <div className="user-menu">
            <img src={user.avatar} alt="Profile" className="user-avatar" />
            <button onClick={handleLogout} className="logout-button">
              Se déconnecter
            </button>
          </div>
        ) : (
          <>
            <button onClick={() => setIsLoginModalOpen(true)}>Se connecter</button>
            <button onClick={() => setIsRegisterModalOpen(true)}>S'inscrire</button>
          </>
        )}
      </div>

      {isLoginModalOpen && (
        <LoginModal
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={handleLogin}
        />
      )}

      {isRegisterModalOpen && (
        <RegisterModal
          onClose={() => setIsRegisterModalOpen(false)}
          onRegister={handleRegister}
        />
      )}
    </nav>
  );
};

export default Navbar;




