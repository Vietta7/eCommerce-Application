import { useEffect, useState } from 'react';
import MinusIcon from '../../Icons/MinusIcon';
import { PlusIcon } from '../../Icons/PlusIcon';
import { Button } from '../../ui/Button/Button';
import styles from './CartItem.module.css';
import { TrashIcon } from '../../Icons/TrashIcon';
import useAccessToken from '../../../hooks/useAccessToken';
import { useCart } from '../../../hooks/useCart';
import { ProductProjection } from '@commercetools/platform-sdk';
import { getProduct } from '../../../api/api';

interface CartItemProps {
  name: string;
  totalPrice: number;
  price: number;
  quantity: number;
  productId: string;
  lineItemId: string;
  discountedPrice: number;
  priceDiscountedProduct: number;
}

export const CartItem = ({
  name,
  price,
  totalPrice,
  quantity,
  productId,
  lineItemId,
  discountedPrice,
  priceDiscountedProduct,
}: CartItemProps) => {
  const [quantityEdit, setQuantityEdit] = useState<number>(quantity);
  const { token } = useAccessToken();
  const { removeProductFromCart, updateQuantityFromCart } = useCart();
  const [product, setProduct] = useState<ProductProjection>();

  useEffect(() => {
    const getProd = async () => {
      try {
        if (!productId) return;
        if (!token) return;

        const res = await getProduct(token, productId);

        setProduct(res);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    };

    getProd();
  }, [token]);

  const image = product?.masterVariant?.images?.[0]?.url || '/placeholder.jpg';

  const onClickMinusQuantity = async () => {
    if (quantityEdit <= 1) return;
    setQuantityEdit((prev) => (prev = prev - 1));
    await onUpdateQuantity(lineItemId, quantityEdit - 1);
  };

  const onClickPlusQuantity = async () => {
    setQuantityEdit((prev) => (prev = prev + 1));
    await onUpdateQuantity(lineItemId, quantityEdit + 1);
  };

  const onDeleteProductFromCart = async () => {
    try {
      await removeProductFromCart(lineItemId);
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateQuantity = async (lineItemId: string, quantity: number) => {
    try {
      await updateQuantityFromCart(lineItemId, quantity);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className={styles.product_item}>
      <div className={styles.image_wrapper}>
        <img
          className={styles.product_image}
          width="130"
          height="180"
          src={image || '/placeholder.jpg'}
          alt={name}
        />
      </div>
      <div className={styles.product_heading}>
        <h3 className={styles.product_name}>{name}</h3>
        <div className={`${styles.product_price} ${styles.price_one}`}>
          <span className={styles.current_price}>
            {discountedPrice
              ? `${discountedPrice} $`
              : priceDiscountedProduct
                ? `${priceDiscountedProduct} $`
                : `${price} $`}
          </span>
          <span className={styles.old_price}>
            {' '}
            {discountedPrice ? `${price} $` : priceDiscountedProduct ? `${price} $` : ''}
          </span>
        </div>
      </div>
      <div className={styles.product_desc}>
        <div className={styles.quantity}>
          <Button
            className={styles.btn_quantity}
            onClick={onClickMinusQuantity}
            disabled={quantityEdit === 1}
          >
            <MinusIcon />
          </Button>
          <input
            className={styles.quantity_input}
            type="number"
            autoComplete="off"
            min="1"
            readOnly
            value={quantityEdit}
          />
          <Button className={styles.btn_quantity} onClick={onClickPlusQuantity}>
            <PlusIcon />
          </Button>
        </div>
        <div className={styles.product_price}>
          <span className={styles.current_price}>{totalPrice} $</span>
          <span className={styles.old_price}>
            {discountedPrice
              ? `${price * quantityEdit} $`
              : priceDiscountedProduct
                ? `${price} $`
                : ''}
          </span>
        </div>
        <Button className={styles.btn_delete} onClick={onDeleteProductFromCart}>
          <TrashIcon />
        </Button>
      </div>
    </li>
  );
};
