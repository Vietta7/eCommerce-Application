import toast from 'react-hot-toast';
import { getCookie } from '../../utils/getCookie';

export interface AddProductToCart {
  cartId: string;
  version: number;
  productId: string;
  quantity: number;
  variantId: number;
}

export const addProductToCart = async ({
  cartId,
  version,
  productId,
  variantId,
  quantity = 1,
}: AddProductToCart) => {
  const userToken = getCookie('access_token');

  const body = {
    version,
    actions: [
      {
        action: 'addLineItem',
        productId,
        variantId,
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
      throw new Error('Error get cart');
    }
    toast.success('Product add to cart');
    return cart;
  } catch (error) {
    console.error('Error get cart:', error);
    return null;
  }
};
