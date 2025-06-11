import { useEffect, useState } from 'react';
import MinusIcon from '../../Icons/MinusIcon';
import { PlusIcon } from '../../Icons/PlusIcon';
import { Button } from '../../ui/Button/Button';
import styles from './CartItem.module.css';
import { TrashIcon } from '../../Icons/TrashIcon';
import useAccessToken from '../../../hooks/useAccessToken';
import { getImageProduct } from '../../../api/cartAPI/getImageProduct';
import { useCart } from '../../../hooks/useCart';

interface CartItemProps {
  name: string;
  price: number;
  quantity: number;
  productId: string;
  lineItemId: string;
}

export const CartItem = ({ name, price, quantity, productId, lineItemId }: CartItemProps) => {
  const [quantityEdit, setQuantityEdit] = useState<number>(quantity);
  const [image, setImage] = useState<string>('/placeholder.png');
  const { token } = useAccessToken();
  const { removeProductFromCart, updateQuantityFromCart } = useCart();

  useEffect(() => {
    const getImage = async () => {
      if (!token) return;
      try {
        const productImage = await getImageProduct({ productId, userToken: token });
        setImage(productImage);
      } catch (error) {
        console.log(error);
      }
    };

    getImage();
  }, [token]);

  const onClickMinusQuantity = async () => {
    if (quantityEdit <= 1) return;
    setQuantityEdit((prev) => (prev -= 1));
    console.log('quantity', quantityEdit);
    await onUpdateQuantity(lineItemId, quantityEdit);
  };

  const onClickPlusQuantity = async () => {
    setQuantityEdit((prev) => (prev += 1));
    await onUpdateQuantity(lineItemId, quantityEdit);
    console.log('quantity', quantityEdit);
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
        <img className={styles.product_image} width="130" height="180" src={image} alt={name} />
      </div>
      <div>
        <h3 className={styles.product_name}>{name}</h3>
        <div className={`${styles.product_price} ${styles.price_one}`}>
          <span>{price / quantityEdit} $</span>
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
