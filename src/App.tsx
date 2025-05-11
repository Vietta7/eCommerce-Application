import { useEffect, useState } from 'react';
import './App.css';
import RegistrationPage from './pages/registration/RegistrationPage';
import { AccessTokenContext } from './context/AccessTokenContext';

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    async function fetchAccessToken() {
      try {
        const res = await fetch('https://dino-land.netlify.app/api/token/');
        if (!res.ok) {
          throw new Error(`Something went wrong: ${res.status}`);
        }
        const data = await res.json();
        const { access_token: accessToken } = data;
        setToken(accessToken);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    fetchAccessToken();
  }, []);

  return (
    <AccessTokenContext.Provider value={token}>
      <RegistrationPage />
    </AccessTokenContext.Provider>
  );
}

export default App;
