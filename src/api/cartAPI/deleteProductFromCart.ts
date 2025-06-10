import toast from 'react-hot-toast';
import { getCookie } from '../../utils/getCookie';

export interface DeleteProductToCartProps {
  cartId: string;
  version: number;
  lineItemId: string;
}

export const deleteProductFromCart = async ({
  cartId,
  version,
  lineItemId,
}: DeleteProductToCartProps) => {
  const userToken = getCookie('access_token');

  const body = {
    version,
    actions: [
      {
        action: 'removeLineItem',
        lineItemId,
      },
    ],
  };

  try {
    const response = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/dino-land/me/carts/${cartId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );

    const cart = await response.json();

    if (!response.ok) {
      if (cart.message) {
        toast.error(cart.message);
        throw new Error(cart.message);
      }
      throw new Error('Error delete from cart');
    }
    toast.success('Product delete from cart');
    return cart;
  } catch (error) {
    console.error('Error delete from cart:', error);
    return null;
  }
};
