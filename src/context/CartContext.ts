import { createContext } from 'react';

export type AddCartItem = {
  productId: string;
  variantId: number;
  quantity: number;
};

export type CartItem = AddCartItem & {
  name: {
    'en-GB': 'Velociraptor';
  };
  price: number;
  lineItemId: string;
};

export interface CartContextValue {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
  addToCart: (product: AddCartItem) => Promise<void>;
  removeProductFromCart: (lineItemId: string) => Promise<void>;
  updateQuantityFromCart: (lineItemId: string, quantity: number) => Promise<void>;
  deleteAllItemsFromCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);
