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
import { applyPromocode } from '../api/cartAPI/applyPromocode';
import { Cart, DiscountedLineItemPrice } from '@commercetools/platform-sdk';

interface CartProviderProps {
  children: ReactNode;
}

type ExtendedLineItem = Cart['lineItems'][number] & {
  discountedPrice?: DiscountedLineItemPrice;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState('');
  const { isAuthenticated } = useContext(AuthContext);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPriceCart = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalPriceCartWithoutPromocode = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const mapItems = (lineItems: ExtendedLineItem[]): CartItem[] =>
    lineItems.map(({ productId, variant, id, name, totalPrice, quantity, discountedPrice }) => ({
      productId,
      variantId: variant.id,
      lineItemId: id,
      name,
      quantity,
      price: variant.prices ? variant.prices[0].value.centAmount / 100 : 0,
      priceDiscountedProduct: variant.prices
        ? variant.prices[0].discounted
          ? variant.prices[0].discounted.value.centAmount / 100
          : 0
        : 0,
      totalPrice: totalPrice.centAmount / 100,
      discountedPrice: discountedPrice ? discountedPrice.value.centAmount / 100 : 0,
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

  const applyPromocodeIntoCart = async (code: string) => {
    try {
      const cart = await getCart();
      const updatedCart = await applyPromocode({ cartId: cart.id, version: cart.version, code });
      if (updatedCart?.lineItems) setItems(mapItems(updatedCart.lineItems));
    } catch (err) {
      console.error('Failed apply promocode:', err);
      throw err;
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        totalPriceCart,
        totalPriceCartWithoutPromocode,
        addToCart,
        removeProductFromCart,
        updateQuantityFromCart,
        deleteAllItemsFromCart,
        applyPromocodeIntoCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
