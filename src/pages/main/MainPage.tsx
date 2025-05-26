import { Link } from 'react-router-dom';
import styles from './MainPage.module.css';

const MainPage = () => {
  const featuredProducts = [
    {
      id: '1',
      name: 'Tyrannosaurus Rex',
      image: '/img/tyrannosaurus.png',
      price: 410.0,
      link: '/tyrannosaurus',
    },
    {
      id: '2',
      name: 'Triceratops',
      image: '/img/Triceratops.png',
      price: 390.0,
      discountedPrice: 331.5,
      link: '/triceratops',
    },
    {
      id: '3',
      name: 'Brachiosaurus',
      image: '/img/Brachiosaurus.png',
      price: 430.0,
      link: '/brachiosaurus',
    },
    {
      id: '4',
      name: 'Pachycephalosaurus',
      image: '/img/Pachycephalosaurus.png',
      price: 200.0,
      discountedPrice: 170.0,
      link: '/pachycephalosaurus',
    },
    {
      id: '5',
      name: 'Compsognathus',
      image: '/img/Compsognathus.png',
      price: 120.0,
      discountedPrice: 102.0,
      link: '/compsognathus',
    },
  ];
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

            {featuredProducts.slice(2).map((product) => (
              <div key={product.id} className={styles.grid_card}>
                <div className={styles.grid_image_container}>
                  <img src={product.image} alt={product.name} className={styles.grid_image} />
                  {product.discountedPrice && (
                    <div className={styles.discount_badge}>
                      -{Math.round((1 - product.discountedPrice / product.price) * 100)}%
                    </div>
                  )}
                </div>
                <div className={styles.grid_content}>
                  <h3>{product.name}</h3>
                  <div className={styles.price_container}>
                    <div className={styles.price_wrapper}>
                      {product.discountedPrice ? (
                        <>
                          <span className={styles.original_price}>${product.price.toFixed(2)}</span>
                          <span className={styles.discounted_price}>
                            ${product.discountedPrice.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className={styles.price}>${product.price.toFixed(2)}</span>
                      )}
                    </div>
                    <Link to={product.link} className={styles.plus_button}>
                      <span className={styles.plus_icon}></span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            <div className={`${styles.grid_card} ${styles.special_card}`}>
              <div className={styles.special_content}>
                <h3>Exclusive dinosaurs</h3>
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
