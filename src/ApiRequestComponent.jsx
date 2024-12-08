import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Qs from 'qs'; // Assurez-vous que Qs est installé via `npm install qs`

const ApiRequestComponent = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios({
          url: '/ping', // URL spécifique de l'API
          method: 'get',
          baseURL: 'https://greenvelvet.alwaysdata.net/pfc', // Base URL de l'API
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
          params: { ID: 12345 }, // Exemple de paramètre (peut être ajusté)
          paramsSerializer: params => {
            return Qs.stringify(params, { arrayFormat: 'brackets' });
          },
          timeout: 1000,
          responseType: 'json',
        });

        // Stocker la réponse dans l'état
        setResponse(result.data);
      } catch (err) {
        // Stocker l'erreur dans l'état
        setError(err.message);
      }
    };

    fetchData(); // Appel de la fonction de récupération des données
  }, []);

  return (
    <div>
      <h1>API Request Example</h1>
      {response ? (
        <pre>{JSON.stringify(response, null, 2)}</pre>
      ) : error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ApiRequestComponent;



