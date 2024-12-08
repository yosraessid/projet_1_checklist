import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Hook pour la redirection

const Login = () => {
  const navigate = useNavigate(); // Hook pour rediriger l'utilisateur après la connexion
  const [username, setUsername] = useState(""); // État pour le nom d'utilisateur
  const [password, setPassword] = useState(""); // État pour le mot de passe
  const [error, setError] = useState(""); // Pour afficher les messages d'erreur

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche la soumission par défaut du formulaire

    // Vérification des données statiques (nom d'utilisateur et mot de passe)
    if (username === "yosraessid" && password === "123_67yosra") {
        console.log("Connexion réussie"); 
      // Redirection vers le dashboard si les informations sont correctes
      navigate("/dashboard");
    } else {
      // Afficher une erreur si les informations sont incorrectes
      setError("Nom d'utilisateur ou mot de passe incorrect.");
    }
  };

  return (
    <div className="login-container">
      <h1>Se connecter</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            type="text" // Champ pour entrer le nom d'utilisateur
            id="username"
            name="username"
            placeholder="Entrez votre nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Mise à jour de l'état
            required
          />
        </div>

        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password" // Champ pour entrer le mot de passe
            id="password"
            name="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Mise à jour de l'état
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>} {/* Affichage de l'erreur */}

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;





