import { ReactNode, useEffect, useState } from 'react';
import { getCart } from '../api/cartAPI/getCart';
import { AddCartItem, CartContext, CartItem } from '../context/CartContext';
import { addProductToCart } from '../api/cartAPI/addProductToCart';
import { deleteProductFromCart } from '../api/cartAPI/deleteProductFromCart';

interface CartProviderProps {
  children: ReactNode;
}

interface CartItemFromAPI {
  productId: string;
  variant: { id: number };
  quantity: number;
  name: string;
  totalPrice: {
    centAmount: number;
  };
  id: string;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [cartId, setCardId] = useState('');

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  console.log(items);

  useEffect(() => {
    async function fetchInitialCart() {
      try {
        const cart = await getCart();
        setCardId(cart.id);

        if (cart?.lineItems) {
          const initialItems: CartItem[] = cart.lineItems.map((item: CartItemFromAPI) => ({
            productId: item.productId,
            variantId: item.variant.id,
            quantity: item.quantity,
            name: item.name,
            price: item.totalPrice.centAmount / 100,
            lineItemId: item.id,
          }));
          setItems(initialItems);
        }
      } catch (err) {
        console.error('Failed to fetch initial cart:', err);
      } finally {
        setIsInitialized(true);
      }
    }

    fetchInitialCart();
  }, []);

  const addToCart = async ({ productId, variantId, quantity }: AddCartItem) => {
    try {
      const { version } = await getCart();

      const updatedCart = await addProductToCart({
        cartId,
        productId,
        variantId,
        quantity,
        version,
      });

      if (updatedCart?.lineItems) {
        const newItems: CartItem[] = updatedCart.lineItems.map((item: CartItemFromAPI) => ({
          productId: item.productId,
          variantId: item.variant.id,
          quantity: item.quantity,
          name: item.name,
          price: item.totalPrice.centAmount / 100,
          lineItemId: item.id,
        }));
        setItems(newItems);
      }
    } catch (err) {
      console.error('Failed to add product to cart:', err);
      throw err;
    }
  };

  const removeProductFromCart = async (lineItemId: string) => {
    try {
      const { version } = await getCart();
      const updatedCart = await deleteProductFromCart({ cartId, version, lineItemId });
      if (updatedCart?.lineItems) {
        const newItems: CartItem[] = updatedCart.lineItems.map((item: CartItemFromAPI) => ({
          productId: item.productId,
          variantId: item.variant.id,
          quantity: item.quantity,
          name: item.name,
          lineItemId: item.id,
          price: item.totalPrice.centAmount / 100,
        }));
        setItems(newItems);
      }
    } catch (err) {
      console.error('Failed to add product to cart:', err);
      throw err;
    }
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <CartContext.Provider
      value={{ items, totalCount, totalPrice, addToCart, removeProductFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
