import toast from 'react-hot-toast';
import { getCookie } from '../../utils/getCookie';

export const getCart = async () => {
  const userToken = getCookie('access_token');
  try {
    const response = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/dino-land/me/active-cart`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const cart = await response.json();
    console.log(cart);

    if (!response.ok) {
      if (cart.message) {
        toast.error(cart.message);
        throw new Error(cart.message);
      }
      throw new Error('Error add addresses');
    }

    return cart;
  } catch (error) {
    console.error('Error add addresses:', error);
    return null;
  }
};
