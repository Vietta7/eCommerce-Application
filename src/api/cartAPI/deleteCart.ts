import toast from 'react-hot-toast';
import { getCookie } from '../../utils/getCookie';

export interface DeleteCartProps {
  cartId: string;
  version: number;
}

export const deleteCart = async ({ cartId, version }: DeleteCartProps) => {
  const userToken = getCookie('access_token');

  try {
    const response = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/dino-land/me/carts/${cartId}?version=${version}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const cart = await response.json();

    if (!response.ok) {
      if (cart.message) {
        toast.error(cart.message);
        throw new Error(cart.message);
      }
      throw new Error('Error cart delete');
    }
    toast.success('All items delete success');
    return cart;
  } catch (error) {
    console.error('Error cart delete:', error);
    return null;
  }
};
