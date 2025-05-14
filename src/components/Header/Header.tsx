import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../assets/img/logo.png';
import cartIcon from '../../assets/img/cart.svg';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const { isAuthenticated, setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logo} alt="Dino-Land Logo" />
        </Link>
        <span>DINO-LAND</span>
      </div>

      <nav className={styles.menu}>
        <ul>
          <li>
            <Link to="/" className={styles.menu_item}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/catalog" className={styles.menu_item}>
              Catalog
            </Link>
          </li>
          <li>
            <Link to="/about" className={styles.menu_item}>
              About
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.actions}>
        {!isAuthenticated ? (
          <>
            <Link to="/login" className={styles.button}>
              Log In
            </Link>
            <Link to="/registration" className={styles.button}>
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={() => {
              document.cookie = 'access_token=; ';
              setAuthenticated(false);
              navigate('/login');
            }}
          >
            Log out
          </button>
        )}
        <div className={styles.cart_icon}>
          <img src={cartIcon} alt="Cart" />
          <span className={styles.badge}>0</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
