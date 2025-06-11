import toast from 'react-hot-toast';
import { getCookie } from '../../utils/getCookie';

export interface UpdateCartQuantityProps {
  cartId: string;
  version: number;
  lineItemId: string;
  quantity: number;
}

export const updateCartQuantity = async ({
  cartId,
  version,
  lineItemId,
  quantity,
}: UpdateCartQuantityProps) => {
  const userToken = getCookie('access_token');

  const body = {
    version,
    actions: [
      {
        action: 'changeLineItemQuantity',
        lineItemId,
        quantity,
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
      throw new Error('Error update quantity');
    }
    toast.success('Product update quantity');
    return cart;
  } catch (error) {
    console.error('Error update quantity:', error);
    return null;
  }
};
