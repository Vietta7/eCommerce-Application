import { Link } from 'react-router-dom';
import styles from './MainPage.module.css';
import Header from '../../components/Header/Header';

const MainPage = () => {
  return (
    <>
      <Header isMainPage={true} />
      <main className={styles.main}>
        <section className={styles.banner_section}>
          <div className={styles.banner_content}>
            <h1 className={styles.banner_section_title}>
              Jurassic period in your terrarium. Adopt a dinosaur. Seriously.
            </h1>
            <Link to="/catalog" className={styles.banner_button}>
              Explore Now
            </Link>
          </div>
        </section>
        <div className={styles.cards_wrapper}>
          <div className={styles.cards_container}>
            <div className={styles.card}>
              <div className={styles.card_image_container}>
                <img
                  src="./src/assets/img/dino-cards/tyrannosaurus.png"
                  alt="Tyrannosaurus Rex"
                  className={styles.card_image}
                />
              </div>
              <div className={styles.card_content}>
                <h3>
                  Tyrannosaurus <br />
                  Rex
                </h3>
                <Link to="/tyrannosaurus" className={styles.card_button}>
                  View Details
                </Link>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.card_image_container}>
                <img
                  src="./src/assets/img/dino-cards/triceratops.png"
                  alt="Triceratops"
                  className={styles.card_image}
                />
              </div>
              <div className={styles.card_content}>
                <h3>Triceratops</h3>
                <Link to="/triceratops" className={styles.card_button}>
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MainPage;
