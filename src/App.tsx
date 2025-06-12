import { useEffect, useState } from 'react';
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
import ProductPage from './pages/ProductPage/ProductPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { ROUTES } from './routes/routes';
import { CartPage } from './pages/cart/CartPage';
import { CartProvider } from './providers/cartProvider';

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
        <CartProvider>
          <Router>
            <Header />
            <div className="main">
              <Routes>
                <Route path={ROUTES.PRODUCTID} element={<ProductPage />} />
                <Route path={ROUTES.HOME} element={<MainPage />} />
                <Route path={ROUTES.LOGIN} element={<AutorisationPage />} />
                <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
                <Route path={ROUTES.ABOUT} element={<AboutPage />} />
                <Route path={ROUTES.CATALOG} element={<CatalogPage />} />
                <Route
                  path={ROUTES.PROFILE}
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route path={ROUTES.CART} element={<CartPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
            <Footer />
          </Router>
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        </CartProvider>
      </AuthProvider>
    </AccessTokenContext.Provider>
  );
}

export default App;
