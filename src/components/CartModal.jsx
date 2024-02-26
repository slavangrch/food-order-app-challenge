import { forwardRef } from 'react';

const CartModal = forwardRef(function CartModal(props, ref) {
  return (
    <dialog ref={ref} className="modal">
      <h2>Your Cart</h2>
      <ul></ul>
      <form method="dialog" className="modal-actions">
        <button className="text-button">Close</button>
        <button className="button">Go to Checkout</button>
      </form>
    </dialog>
  );
});

export default CartModal;
