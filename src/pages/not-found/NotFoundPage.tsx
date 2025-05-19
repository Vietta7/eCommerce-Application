import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404 Error</h1>
        <p className={styles.text}>Page not found. Let&apos;s get you back on track!</p>
        <Link to="/" className={styles.button}>
          Back to main
        </Link>
      </div>
      <div className={styles.image_container}>
        <img src="src/assets/img/dino-404.png" alt="Error icon" className={styles.image} />
      </div>
    </div>
  );
};

export default NotFoundPage;
