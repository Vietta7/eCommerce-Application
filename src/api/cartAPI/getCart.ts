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

    if (!response.ok) {
      if (cart.message) {
        throw new Error(cart.message);
      }
      throw new Error('Error get cart');
    }

    return cart;
  } catch (error) {
    console.error('Error get cart:', error);
    return null;
  }
};
