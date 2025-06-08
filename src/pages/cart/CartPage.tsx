import { Link } from 'react-router-dom';
import styles from './CartPage.module.css';
import { ROUTES } from '../../routes/routes';
import { useEffect } from 'react';
import { getCart } from '../../api/cartAPI/getCart';

export const CartPage = () => {
  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className={styles.cart_page}>
      <div className={styles.page_bg}>
        <h1 className={styles.heading}>Shopping Bag</h1>
        <div className={styles.content}>
          <div className={styles.empty_cart}>
            <p>Still empty?</p>
            <p>Add something toothy!</p>
            <Link className={styles.link} to={ROUTES.CATALOG}>
              To Catalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
