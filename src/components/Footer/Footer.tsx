import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.columns}>
          <div className={styles.column}>
            <h3 className={styles.title}>Dinosaur Shop</h3>
            <p className={styles.description}>Store for smaller replicas of real dinosaurs</p>
          </div>
          <div className={styles.column}>
            <h3 className={styles.title}>Shopping</h3>
            <ul className={styles.list}>
              <li>
                <Link to="/cart">Your cart</Link>
              </li>
              <li>
                <Link to="/catalog">Catalog</Link>
              </li>
              <li>
                <Link to="/catalog">Compared items</Link>
              </li>
              <li>
                <Link to="/catalog">New Arrivals</Link>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.title}>More Links</h3>
            <ul className={styles.list}>
              <li>
                <Link to="/about">About Developers</Link>
              </li>
              <li>
                <Link to="/catalog">New Arrivals</Link>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.title}>Developers</h3>
            <ul className={styles.list}>
              <li>
                <a href="https://github.com/Vietta7" target="_blank" rel="noopener noreferrer">
                  Anna
                </a>
              </li>
              <li>
                <a href="https://github.com/kuzmich84" target="_blank" rel="noopener noreferrer">
                  Dmitry
                </a>
              </li>
              <li>
                <a href="https://github.com/kkotess" target="_blank" rel="noopener noreferrer">
                  Ekaterina
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.copyright}>
          ©
          <a
            href="https://rs.school/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.schoolLink}
          >
            RS-School
          </a>
          {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
