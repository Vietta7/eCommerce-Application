import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../assets/img/logo.svg';
import menuIcon from '../../assets/img/burger-menu.svg';
import closeIcon from '../../assets/img/close.svg';
import cartIcon from '../../assets/img/cart.svg';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

interface HeaderProps {
  isMainPage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isMainPage = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 814) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    }
  }, [menuOpen]);

  const { isAuthenticated, setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className={`${styles.header} ${isMainPage ? styles.main_header : ''}`}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logo} alt="Dino-Land Logo" className={isMainPage ? styles.logo_white : ''} />
        </Link>
        <span className={isMainPage ? styles.logo_white : ''}>DINO-LAND</span>
      </div>

      <nav className={`${styles.desktop_nav} ${menuOpen ? styles.hidden : ''}`}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/catalog">Catalog</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <div className={`${styles.desktop_actions} ${menuOpen ? styles.hidden : ''}`}>
        <Link to="/login" className={styles.button}>
          Log In
        </Link>
        <Link to="/registration" className={styles.button}>
          Sign Up
        </Link>
      </div>
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
            className={styles.button}
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
          <Link to="/cart">
            <img src={cartIcon} alt="Cart" className={isMainPage ? styles.cart_white : ''} />
            <span className={styles.badge}>0</span>
          </Link>
        </div>
      </div>

      <button className={styles.burger_menu} onClick={() => setMenuOpen(!menuOpen)}>
        <img
          src={menuOpen ? closeIcon : menuIcon}
          alt="Menu"
          className={isMainPage ? styles.burger_menu_white : ''}
        />
      </button>

      <div className={`${styles.mobile_menu} ${menuOpen ? styles.mobile_menu_open : ''}`}>
        <nav className={styles.mobile_nav}>
          <ul>
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/catalog" onClick={() => setMenuOpen(false)}>
                Catalog
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setMenuOpen(false)}>
                About
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.mobile_actions}>
          <Link to="/login" onClick={() => setMenuOpen(false)} className={styles.button}>
            Log In
          </Link>
          <Link to="/registration" onClick={() => setMenuOpen(false)} className={styles.button}>
            Sign Up
          </Link>
          <div className={styles.mobile_cart}>
            <Link to="/cart" onClick={() => setMenuOpen(false)}>
              <img src={cartIcon} alt="Cart" className={styles.cart_black} />
              <span className={styles.badge}>0</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
