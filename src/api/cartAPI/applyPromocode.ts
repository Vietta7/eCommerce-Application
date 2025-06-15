import toast from 'react-hot-toast';
import { getCookie } from '../../utils/getCookie';

interface ApplyPromocodeProps {
  cartId: string;
  version: number;
  code: string;
}

export const applyPromocode = async ({ cartId, version, code }: ApplyPromocodeProps) => {
  const userToken = getCookie('access_token');

  const body = {
    version,
    actions: [
      {
        action: 'addDiscountCode',
        code,
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
      throw new Error('Error apply promocode');
    }
    toast.success('Product apply promocode');
    return cart;
  } catch (error) {
    console.error('Error apply promocode:', error);
    return null;
  }
};
