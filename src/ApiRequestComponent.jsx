import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Qs from 'qs'; // Assurez-vous que Qs est installé via `npm install qs`

const ApiRequestComponent = () => {
  const [response, setResponse] = useState(null); // État pour stocker la réponse de l'API
  const [error, setError] = useState(null); // État pour stocker les erreurs éventuelles
  const [isLoading, setIsLoading] = useState(true); // État pour indiquer le chargement
  const token = "1aefe8117c4401c4f3b60faec61085d0853ee634"; // Token d'authentification

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios({
          url: '/ping', // URL spécifique de l'API
          method: 'get',
          baseURL: 'https://greenvelvet.alwaysdata.net/pfc', // Base URL de l'API
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: `Bearer ${token}`, // Ajout du token dans les headers
          },
          params: { ID: 12345 }, // Exemple de paramètre (ajustez selon vos besoins)
          paramsSerializer: params => Qs.stringify(params, { arrayFormat: 'brackets' }),
          timeout: 3000, // Timeout augmenté pour assurer une marge suffisante
          responseType: 'json',
        });

        // Stocker la réponse dans l'état
        setResponse(result.data);
      } catch (err) {
        // Stocker l'erreur dans l'état
        setError(err.response?.data?.message || err.message);
      } finally {
        // Désactiver le chargement
        setIsLoading(false);
      }
    };

    fetchData(); // Appel de la fonction de récupération des données
  }, []);

  return (
    <div>
      <h1>API Request Example</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : (
        <pre>{JSON.stringify(response, null, 2)}</pre>
      )}
    </div>
  );
};

export default ApiRequestComponent;




