import { Link } from 'react-router-dom';
import styles from './MainPage.module.css';

const MainPage = () => {
  return (
    <>
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
                  src="/img/tyrannosaurus.png"
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
                <img src="/img/Triceratops.png" alt="Triceratops" className={styles.card_image} />
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

        <section className={styles.dino_grid_section}>
          <div className={styles.grid_container}>
            <div className={`${styles.grid_card} ${styles.special_card}`}>
              <div className={styles.special_content}>
                <h3>Special offer</h3>
                <p>Get 20% off your first order</p>
                <Link to="/catalog" className={styles.grid_button}>
                  View All
                </Link>
              </div>
            </div>

            <div className={styles.grid_card}>
              <div className={styles.grid_image_container}>
                <img
                  src="/img/Pachycephalosaurus.png"
                  alt="Pachycephalosaurus"
                  className={styles.grid_image}
                />
              </div>
              <div className={styles.grid_content}>
                <h3>Pachycephalosaurus</h3>
                <div className={styles.price_container}>
                  <div className={styles.price_wrapper}>
                    <p>216,27 $</p>
                    <span>500,27 $</span>
                  </div>
                  <Link to="/pachycephalosaurus" className={styles.plus_button} />
                </div>
              </div>
            </div>
            <div className={styles.grid_card}>
              <div className={styles.grid_image_container}>
                <img src="/img/Microraptor.png" alt="Microraptor" className={styles.grid_image} />
              </div>
              <div className={styles.grid_content}>
                <h3>Microraptor</h3>
                <div className={styles.price_container}>
                  <div className={styles.price_wrapper}>
                    <p>216,27 $</p>
                    <span>500,27 $</span>
                  </div>
                  <Link to="/Microraptor" className={styles.plus_button} />
                </div>
              </div>
            </div>
            <div className={styles.grid_card}>
              <div className={styles.grid_image_container}>
                <img
                  src="/img/Compsognathus.png"
                  alt="Compsognathus"
                  className={styles.grid_image}
                />
              </div>
              <div className={styles.grid_content}>
                <h3>Compsognathus</h3>
                <div className={styles.price_container}>
                  <div className={styles.price_wrapper}>
                    <p>216,27 $</p>
                    <span>500,27 $</span>
                  </div>
                  <Link to="/Microraptor" className={styles.plus_button} />
                </div>
              </div>
            </div>
            <div className={styles.grid_card}>
              <div className={styles.grid_image_container}>
                <img
                  src="/img/Archaeopteryx.png"
                  alt="Archaeopteryx"
                  className={styles.grid_image}
                />
              </div>
              <div className={styles.grid_content}>
                <h3>Archaeopteryx</h3>
                <div className={styles.price_container}>
                  <div className={styles.price_wrapper}>
                    <p>216,27 $</p>
                    <span>500,27 $</span>
                  </div>
                  <Link to="/Microraptor" className={styles.plus_button} />
                </div>
              </div>
            </div>
            <div className={styles.grid_card}>
              <div className={styles.grid_image_container}>
                <img
                  src="/img/Brachiosaurus.png"
                  alt="Brachiosaurus"
                  className={styles.grid_image}
                />
              </div>
              <div className={styles.grid_content}>
                <h3>Brachiosaurus</h3>
                <div className={styles.price_container}>
                  <div className={styles.price_wrapper}>
                    <p>216,27 $</p>
                    <span>500,27 $</span>
                  </div>
                  <Link to="/Microraptor" className={styles.plus_button} />
                </div>
              </div>
            </div>
            <div className={`${styles.grid_card} ${styles.special_card}`}>
              <div className={styles.special_content}>
                <h3>Exlusive dinosaurs</h3>
                <p>Make a little friend</p>
                <Link to="/catalog" className={styles.grid_button}>
                  View Detail
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.cta_banner}>
          <div className={styles.cta_container}>
            <h2 className={styles.cta_title}>Create your own prehistoric world right now!</h2>
            <p className={styles.cta_text}>
              Join the community of paleontology enthusiasts and get exclusive access to new species
            </p>
            <div className={styles.cta_button}>
              <Link to="/catalog" className={styles.cta_button_primary}>
                View Detail
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default MainPage;
