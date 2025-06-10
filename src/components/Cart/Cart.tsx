import { useCart } from '../../hooks/useCart';
import { Button } from '../ui/Button/Button';
import styles from './Cart.module.css';
import { CartItem } from './CartItem/CartItem';

export const Cart = () => {
  const { items, totalPrice } = useCart();
  if (items.length === 0) return;
  return (
    <div className={styles.cart}>
      <ul className={styles.cart_list}>
        {items.map((item) => (
          <CartItem
            key={item.productId}
            name={item.name['en-GB']}
            price={item.price}
            quantity={item.quantity}
            productId={item.productId}
            lineItemId={item.lineItemId}
          />
        ))}
      </ul>
      <div className={styles.cart_footer}>
        <Button className={styles.btn_delete}>Delete All Items</Button>
        <p className={styles.total_price}>
          Total: <span>{totalPrice} $</span>
        </p>
      </div>
    </div>
  );
};
