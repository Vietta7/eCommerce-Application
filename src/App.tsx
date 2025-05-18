import { useEffect, useState } from 'react';
import './App.css';
import { AccessTokenContext } from './context/AccessTokenContext';
import AutorisationPage from './pages/AutorisationPage/AutorisationPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/main/MainPage';
import NotFoundPage from './pages/not-found/NotFoundPage';

import { Toaster } from 'react-hot-toast';
import AboutPage from './pages/about/AboutPage';
import CatalogPage from './pages/catalog/CatalogPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import RegistrationPage from './pages/registration/RegistrationPage';
import { AuthProvider } from './context/AuthContext';

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
      <AuthProvider>
        <Router>
          <Header />


        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </Router>
      <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<AutorisationPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
        <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
      </AuthProvider>
    </AccessTokenContext.Provider>
  );
}

export default App;
