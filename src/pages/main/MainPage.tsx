import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './MainPage.module.css';
import ProductCard from '../../components/ProductCard/ProductCard';
import useAccessToken from '../../hooks/useAccessToken';
import { Product } from '../../types/product/product';
import { LoaderPage } from '../../components/ui/LoaderPage/LoaderPage';
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton';

const MainPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token, loading: tokenLoading, error: tokenError } = useAccessToken();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      if (!token) return;

      try {
        const projectKey = 'dino-land';
        const response = await fetch(
          `https://api.europe-west1.gcp.commercetools.com/${projectKey}/product-projections/search?staged=true&limit=3`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );

        if (!response.ok) throw new Error('Не удалось загрузить продукты');

        const data = await response.json();
        setProducts(data.results);
      } catch (err) {
        console.error(err);
        setError('Ошибка загрузки товаров');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [token]);

  if (tokenLoading || loading) return <LoaderPage />;
  if (tokenError || error) return <div>Ошибка: {tokenError || error}</div>;

  return (
    <>
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
              <Link
                to="/product/72d4b2a8-fb6d-490a-86d5-e2f187acdea2"
                className={styles.card_button}
              >
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
              <Link
                to="/product/795840b6-707a-497e-8fa5-89cb5207c38f"
                className={styles.card_button}
              >
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
              <p>
                The promo code: <strong className={styles.promocode}>dino-land-2025</strong> gives a
                50% discount for one week only. Apply in cart.
              </p>
              <Link to="/catalog" className={styles.grid_button}>
                View All
              </Link>
            </div>
          </div>

          {products.slice(0, 3).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className={`${styles.grid_card} ${styles.product_card}`}
            />
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
      <ScrollToTopButton />
    </>
  );
};

export default MainPage;
