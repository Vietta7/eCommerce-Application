import { useForm } from 'react-hook-form';
import { useCart } from '../../hooks/useCart';
import { Button } from '../ui/Button/Button';
import { Input } from '../ui/Input/Input';
import styles from './Cart.module.css';
import { CartItem } from './CartItem/CartItem';
import { PromocodeFormData, promocodeSchema } from '../../schemas/promocode.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitButton } from '../ui/SubmitButton/SubmitButton';

export const Cart = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<PromocodeFormData>({
    resolver: zodResolver(promocodeSchema),
    mode: 'onChange',
  });

  const {
    items,
    totalPriceCart,
    totalPriceCartWithoutPromocode,
    deleteAllItemsFromCart,
    applyPromocodeIntoCart,
  } = useCart();
  if (items.length === 0) return;

  const onSumbit = async (data: PromocodeFormData) => {
    try {
      await applyPromocodeIntoCart(data.promocode);
      reset();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className={styles.cart}>
      <ul className={styles.cart_list}>
        {items.map((item) => (
          <CartItem
            key={item.productId}
            name={item.name['en-GB']}
            price={item.price}
            totalPrice={item.totalPrice}
            quantity={item.quantity}
            productId={item.productId}
            lineItemId={item.lineItemId}
            discountedPrice={item.discountedPrice}
            priceDiscountedProduct={item.priceDiscountedProduct}
          />
        ))}
      </ul>
      <form className={styles.cart_promocode} onSubmit={handleSubmit(onSumbit)}>
        <Input
          className={styles.promocode_input}
          label="Promocode"
          name="promocode"
          placeholder="promocode"
          type="text"
          register={register}
          error={errors.promocode}
          inputValue={watch('promocode')}
        />

        <SubmitButton className={styles.promocode_btn} disabled={!isValid}>
          Apply Promocode
        </SubmitButton>
      </form>
      <div className={styles.cart_footer}>
        <Button className={styles.btn_delete} onClick={deleteAllItemsFromCart}>
          Clear Cart
        </Button>
        <div className={styles.total_price}>
          <p>Total: </p>
          <div className={styles.product_price}>
            <span className={styles.current_price}>{totalPriceCart} $</span>
            <span className={styles.old_price}>
              {items[0].discountedPrice ? `${totalPriceCartWithoutPromocode} $` : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
