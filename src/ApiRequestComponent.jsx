import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Qs from 'qs'; // Make sure Qs is installed via `npm install qs`

const ApiRequestComponent = () => {
  const [response, setResponse] = useState(null); // State to store the API response
  const [error, setError] = useState(null); // State to store any potential errors
  const [isLoading, setIsLoading] = useState(true); // State to indicate loading status
  const token = "1aefe8117c4401c4f3b60faec61085d0853ee634"; // Authentication token

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios({
          url: '/ping', // Specific API endpoint URL
          method: 'get',
          baseURL: 'https://greenvelvet.alwaysdata.net/pfc', // Base URL of the API
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: `Bearer ${token}`, // Add the token to the headers
          },
          params: { ID: 12345 }, // Example parameter (adjust as needed)
          paramsSerializer: params => Qs.stringify(params, { arrayFormat: 'brackets' }),
          timeout: 3000, // Increased timeout for sufficient margin
          responseType: 'json',
        });

        // Store the response in the state
        setResponse(result.data);
      } catch (err) {
        // Store the error in the state
        setError(err.response?.data?.message || err.message);
      } finally {
        // Disable the loading state
        setIsLoading(false);
      }
    };

    fetchData(); // Call the data fetching function
  }, []);

  return (
    <div>
      <h1>API Request Example</h1>
      {isLoading ? (
        <p>Loading...</p> // Show a loading message while the data is being fetched
      ) : error ? (
        <p style={{ color: 'red' }}>Error: {error}</p> // Display an error message if an error occurs
      ) : (
        <pre>{JSON.stringify(response, null, 2)}</pre> // Render the API response
      )}
    </div>
  );
};

export default ApiRequestComponent;





