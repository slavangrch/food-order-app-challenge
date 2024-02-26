import { forwardRef, useContext } from 'react';
import { MealsContext } from '../store/available-meals-context';

const CartModal = forwardRef(function CartModal(props, ref) {
  const ctx = useContext(MealsContext);
  let totalPrice = 0;
  ctx.cartItems.map((item) => {
    totalPrice += item.quantity * item.price;
  });
  return (
    <dialog ref={ref} className="cart modal">
      <h2>Your Cart</h2>
      <ul>
        {!ctx.cartItems ? (
          <p>No items picked</p>
        ) : (
          ctx.cartItems.map((item) => {
            return (
              <div className="cart-item">
                <li>{`${item.name} - ${item.quantity} x $${item.price}`}</li>
                <div className="cart-item-actions">
                  <button>-</button>
                  <p>{item.quantity}</p>
                  <button>+</button>
                </div>
              </div>
            );
          })
        )}
      </ul>
      <div className="cart-total">{`$${totalPrice}`}</div>
      <form method="dialog" className="modal-actions">
        <button className="text-button">Close</button>
        <button className="button">Go to Checkout</button>
      </form>
    </dialog>
  );
});

export default CartModal;
