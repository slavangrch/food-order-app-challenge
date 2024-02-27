import { createContext } from 'react';

export const MealsContext = createContext({
  items: null,
  addToCartHandler: () => {},
  cartItems: null,
  incrementProductValue: () => {},
  decrementProductValue: () => {},
  totalPrice: undefined,
  goToCheckoutHandler: {},
  closeCheckoutModal: {},
  successHandler: {},
  //   updateCartStateToInitial: {},
  updateSuccessState: {},
});
