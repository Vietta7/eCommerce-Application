import { useContext } from 'react';
import { CartContext, CartContextValue } from '../context/CartContext';

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
};
