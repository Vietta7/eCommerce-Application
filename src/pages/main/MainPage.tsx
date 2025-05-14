import { Link } from 'react-router-dom';
import styles from './MainPage.module.css';
import Header from '../../components/Header/Header';

const MainPage = () => {
  return (
    <>
      <Header isMainPage={true} />
      <main className={styles.main}>
        <section className={styles.banner_section}>
          <h1 className={styles.banner_section_title}>
            Jurassic period in your terrarium. Adopt a dinosaur. Seriously.
          </h1>
          <Link to="/catalog" className={styles.banner_button}>
            Explore Now
          </Link>
        </section>
      </main>
    </>
  );
};

export default MainPage;
