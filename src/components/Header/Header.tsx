import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../assets/img/logo.png';
import cartIcon from '../../assets/img/cart.svg';

const Header = () => {
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
            <Link to="/" className={styles.menuItem}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/catalog" className={styles.menuItem}>
              Catalog
            </Link>
          </li>
          <li>
            <Link to="/about" className={styles.menuItem}>
              About
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.actions}>
        <Link to="/login" className={styles.button}>
          Login
        </Link>
        <Link to="/registration" className={styles.button}>
          Sign Up
        </Link>
        <div className={styles.cartIcon}>
          <img src={cartIcon} alt="Cart" />
          <span className={styles.badge}>16</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
