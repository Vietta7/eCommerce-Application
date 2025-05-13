import { useEffect, useState } from 'react';
import './App.css';
import RegistrationPage from './pages/registration/RegistrationPage';
import { AccessTokenContext } from './context/AccessTokenContext';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import MainPage from './pages/main/MainPage';
import NotFoundPage from './pages/not-found/NotFoundPage';
import Header from './components/Header/Header';
// import { getAuthToken } from './services/authService'; // согласовать с Димой использование getAuthToken в component\FormRegistration

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
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AccessTokenContext.Provider>
  );
}

export default App;
