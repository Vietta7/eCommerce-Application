import { Link } from 'react-router-dom';
import styles from './CartPage.module.css';
import { ROUTES } from '../../routes/routes';
import { useCart } from '../../hooks/useCart';
import { Cart } from '../../components/Cart/Cart';

export const CartPage = () => {
  const { totalCount } = useCart();
  return (
    <div className={styles.cart_page}>
      <h1 className={styles.heading}>Shopping Bag</h1>
      {totalCount !== 0 ? (
        <Cart />
      ) : (
        <div className={styles.page_bg}>
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
      )}
    </div>
  );
};
