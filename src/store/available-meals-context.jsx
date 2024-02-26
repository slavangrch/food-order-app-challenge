import { createContext } from 'react';

export const MealsContext = createContext({
  items: null,
  addToCartHandler: () => {},
  cartItems: null,
  incrementProductValue: () => {},
  decrementProductValue: () => {},
});
