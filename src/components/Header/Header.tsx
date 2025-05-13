import { Link } from 'react-router-dom';
import './Header.module.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="src/assets/img/logo.png" alt="Dino-Land Logo" />
        <span>DINO-LAND</span>
      </div>

      <nav className="menu">
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

      <div className="actions">
        <button className="login-button">Log In</button>
        <button className="login-button">Sign In</button>
        <div className="cart-icon">
          <img src="src/assets/img/cart.png" alt="Cart" />
          <span className="badge">16</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
