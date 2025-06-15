import { createContext } from 'react';

export type AddCartItem = {
  productId: string;
  variantId: number;
  quantity: number;
};

type LocalizedString = Record<string, string>;

export type CartItem = AddCartItem & {
  name: LocalizedString;
  totalPrice: number;
  price: number;
  lineItemId: string;
  discountedPrice: number;
  priceDiscountedProduct: number;
};

export interface CartContextValue {
  items: CartItem[];
  totalCount: number;
  totalPriceCart: number;
  totalPriceCartWithoutPromocode: number;
  addToCart: (product: AddCartItem) => Promise<void>;
  removeProductFromCart: (lineItemId: string) => Promise<void>;
  updateQuantityFromCart: (lineItemId: string, quantity: number) => Promise<void>;
  deleteAllItemsFromCart: () => Promise<void>;
  applyPromocodeIntoCart: (code: string) => Promise<void>;
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);
