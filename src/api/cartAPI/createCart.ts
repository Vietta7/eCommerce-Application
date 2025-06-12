import toast from 'react-hot-toast';
import { getCookie } from '../../utils/getCookie';

interface CreateCartProps {
  customerId: string;
}

export const createCart = async ({ customerId }: CreateCartProps) => {
  const userToken = getCookie('access_token');

  const body = { customerId, currency: 'USD' };

  try {
    const response = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/dino-land/me/carts`,
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
      throw new Error('Error create cart');
    }

    return cart;
  } catch (error) {
    console.error('Error create cart:', error);
    return null;
  }
};
