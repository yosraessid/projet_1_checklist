import axios from "axios";

// URL racine de l'API
const API_ROOT = "https://greenvelvet.alwaysdata.net/pfc";

// Fonction pour générer un token
export const generateToken = async (email, password) => {
  try {
    const response = await axios.post(`${API_ROOT}/subscribe`, {
      email,
      password,
    });
    return response.data.token; // Assurez-vous que la réponse contient un champ "token"
  } catch (error) {
    console.error("Erreur lors de la génération du token :", error);
    throw error;
  }
};

// Configure Axios avec un token
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["token"] = token;
  } else {
    delete axios.defaults.headers.common["token"];
  }
};

// Fonction pour récupérer les catégories
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_ROOT}/categories`);
    return response.data; // Retourne les catégories
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
    throw error;
  }
};

