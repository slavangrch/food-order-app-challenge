import { forwardRef, useContext } from 'react';
import { MealsContext } from '../store/available-meals-context';

const CartModal = forwardRef(function CartModal(props, ref) {
  const ctx = useContext(MealsContext);
  let totalPrice = 0;
  ctx.cartItems.map((item) => {
    totalPrice += item.quantity * item.price;
  });

  let quantityNumber = 0;
  ctx.cartItems.map((item) => {
    quantityNumber += item.quantity;
  });

  //   console.log(ctx.cartItems);
  return (
    <dialog ref={ref} className="cart modal">
      <h2>Your Cart</h2>
      <ul>
        {ctx.cartItems.length <= 0 && <p>Your cart is empty</p>}
        {ctx.cartItems &&
          ctx.cartItems.map((item) => {
            if (item.quantity > 0) {
              return (
                <div key={item.id} className="cart-item">
                  <li>{`${item.name} - ${item.quantity} x $${item.price}`}</li>
                  <div className="cart-item-actions">
                    <button onClick={() => ctx.decrementProductValue(item)}>
                      -
                    </button>
                    <p>{item.quantity}</p>
                    <button onClick={() => ctx.incrementProductValue(item)}>
                      +
                    </button>
                  </div>
                </div>
              );
            }
          })}
      </ul>
      {totalPrice > 0 && <div className="cart-total">{`$${totalPrice}`}</div>}
      <form method="dialog" className="modal-actions">
        <button className="text-button">Close</button>
        <button className="button">Go to Checkout</button>
      </form>
    </dialog>
  );
});

export default CartModal;
