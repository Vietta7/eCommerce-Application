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
  name: {
    'en-GB': string;
  };
  price: number;
  quantity: number;
  productId: string;
  lineItemId: string;
}

export const CartItem = ({ name, price, quantity, productId, lineItemId }: CartItemProps) => {
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
        console.log(res);
        setProduct(res);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    };

    getProd();
  }, [token]);

  const productPrice = product?.masterVariant.prices![0].value.centAmount as number;
  const salePrice = product?.masterVariant.prices![0].discounted?.value.centAmount as number;
  const currentPrice = +(productPrice / 100).toFixed(2);
  const salePriceOutput = salePrice ? ((salePrice || +currentPrice) / 100)?.toFixed(2) : null;
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

  console.log(name);

  return (
    <li className={styles.product_item}>
      <div className={styles.image_wrapper}>
        <img
          className={styles.product_image}
          width="130"
          height="180"
          src={image}
          alt={name['en-GB']}
        />
      </div>
      <div>
        <h3 className={styles.product_name}>{name['en-GB']}</h3>
        <div className={`${styles.product_price} ${styles.price_one}`}>
          <span>{salePriceOutput} $</span>
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
          <span>{price} $</span>
        </div>
        <Button className={styles.btn_delete} onClick={onDeleteProductFromCart}>
          <TrashIcon />
        </Button>
      </div>
    </li>
  );
};
