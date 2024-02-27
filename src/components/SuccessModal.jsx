import { forwardRef, useContext } from 'react';
import { MealsContext } from '../store/available-meals-context';

const SuccessModal = forwardRef(function SuccessModal(props, ref) {
  const ctx = useContext(MealsContext);

  return (
    <dialog ref={ref} className="cart modal">
      <h2>Success!</h2>
      <p>Your order was submitted successfully.</p>
      <p>
        We will get back to you with more details via email within the next few
        minutes.
      </p>
      <form method="dialog" className="modal-actions">
        <button
          className="button"
          onClick={() => ctx.updateSuccessState(false)}
        >
          Okay
        </button>
      </form>
    </dialog>
  );
});

export default SuccessModal;
