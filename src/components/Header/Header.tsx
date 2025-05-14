import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../assets/img/logo.png';
import cartIcon from '../../assets/img/cart.svg';

interface HeaderProps {
  isMainPage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isMainPage = false }) => {
  return (
    <header className={`${styles.header} ${isMainPage ? styles.main_header : ''}`}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logo} alt="Dino-Land Logo" />
        </Link>
        <span className={isMainPage ? styles.white_text : ''}>DINO-LAND</span>
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
        <Link to="/login" className={styles.button}>
          Log In
        </Link>
        <Link to="/registration" className={styles.button}>
          Sign Up
        </Link>
        <div className={styles.cart_icon}>
          <img src={cartIcon} alt="Cart" />
          <span className={styles.badge}>0</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
