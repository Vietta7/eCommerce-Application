import { ReactNode, useContext, useEffect, useState } from 'react';
import { getCart } from '../api/cartAPI/getCart';
import { AddCartItem, CartContext, CartItem } from '../context/CartContext';
import { addProductToCart } from '../api/cartAPI/addProductToCart';
import { deleteProductFromCart } from '../api/cartAPI/deleteProductFromCart';
import { updateCartQuantity } from '../api/cartAPI/updateCartQuantity';
import { getCustomer } from '../api/getCustomer';
import { getCookie } from '../utils/getCookie';
import { createCart } from '../api/cartAPI/createCart';
import { deleteCart } from '../api/cartAPI/deleteCart';
import { AuthContext } from '../context/AuthContext';

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
  const [cartId, setCartId] = useState('');
  const { isAuthenticated } = useContext(AuthContext);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  console.log(items);

  const mapItems = (lineItems: CartItemFromAPI[]): CartItem[] =>
    lineItems.map(({ productId, variant, id, name, totalPrice, quantity }) => ({
      productId,
      variantId: variant.id,
      lineItemId: id,
      name: { 'en-GB': name },
      quantity,
      price: totalPrice.centAmount / 100,
    }));

  const ensureCart = async () => {
    let cart = await getCart();
    if (!cart) {
      const token = getCookie('access_token');
      if (!token) throw new Error('No auth token');
      const customer = await getCustomer({ userToken: token });
      cart = await createCart({ customerId: customer.id });
    }
    setCartId(cart.id);
    return cart;
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    async function fetchInitialCart() {
      try {
        const cart = await ensureCart();
        if (cart?.lineItems) setItems(mapItems(cart.lineItems));
      } catch (err) {
        console.error('Failed to fetch initial cart:', err);
      }
    }

    fetchInitialCart();
  }, [isAuthenticated]);

  const addToCart = async ({ productId, variantId, quantity }: AddCartItem) => {
    try {
      const activeCart = await ensureCart();

      const { id, version } = activeCart;
      setCartId(id);

      const updatedCart = await addProductToCart({
        cartId: id,
        productId,
        variantId,
        quantity,
        version,
      });

      if (updatedCart?.lineItems) setItems(mapItems(updatedCart.lineItems));
    } catch (err) {
      console.error('Failed to add product to cart:', err);
      throw err;
    }
  };

  const removeProductFromCart = async (lineItemId: string) => {
    try {
      const { version } = await getCart();
      const updatedCart = await deleteProductFromCart({ cartId, version, lineItemId });
      if (updatedCart?.lineItems) setItems(mapItems(updatedCart.lineItems));
    } catch (err) {
      console.error('Failed to add product to cart:', err);
      throw err;
    }
  };

  const updateQuantityFromCart = async (lineItemId: string, quantity: number) => {
    try {
      const { version } = await getCart();
      const updatedCart = await updateCartQuantity({ cartId, version, lineItemId, quantity });
      if (updatedCart?.lineItems) setItems(mapItems(updatedCart.lineItems));
    } catch (err) {
      console.error('Failed update product to cart:', err);
      throw err;
    }
  };

  const deleteAllItemsFromCart = async () => {
    try {
      const cart = await getCart();
      const deletedCart = await deleteCart({ cartId: cart.id, version: cart.version });
      if (deletedCart) {
        const newItems: CartItem[] = [];
        setItems(newItems);
      }
    } catch (err) {
      console.error('Failed delete cart:', err);
      throw err;
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        totalPrice,
        addToCart,
        removeProductFromCart,
        updateQuantityFromCart,
        deleteAllItemsFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
