import { forwardRef, useContext, useState } from 'react';
import { MealsContext } from '../store/available-meals-context';

const Checkout = forwardRef(function Checkout(props, ref) {
  const ctx = useContext(MealsContext);
  //   console.log(ctx.cartItems);
  const [inputIsValid, setInputIsValid] = useState(true);
  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    if (!validateInput(data)) {
      setInputIsValid(false);
      return;
    }
    setInputIsValid(true);
    // console.log(data);
    postData({ items: ctx.cartItems, customer: data });
    event.target.reset();
  }

  async function postData(order) {
    const response = await fetch('http://localhost:3000/orders', {
      method: 'POST',
      body: JSON.stringify({ order }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const resData = await response.json();
    if (response.ok) {
      ctx.closeCheckoutModal();
      ctx.updateSuccessState(true);
    }
    return resData.message;
  }

  const validateInput = (inputValues) => {
    const reEmail = /\S+@\S+\.\S+/;
    const reFullName = /^[a-z]+\s[a-z ]+$/i;
    const reStreet =
      /^(\d{1,}) [a-zA-Z0-9\s]+(\,)? [a-zA-Z]+(\,)? [A-Z]{2} [0-9]{5,6}$/;
    const rePostalCode = /^\d{5}(-\d{4})?$/;
    const reCity = /^([^,]+),[^(]*\(([^()]+)\)/;
    return reEmail.test(inputValues.email);
  };

  return (
    <dialog ref={ref} className="cart modal">
      <form method="dialog" onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>{`Total Amount: $${ctx.totalPrice}`}</p>
        <div className="control">
          <label htmlFor="name">Full Name</label>
          <input type="text" name="name" />
        </div>
        <div className="control">
          <label htmlFor="email">E-Mail Address</label>
          <input type="text" name="email" />
        </div>
        <div className="control">
          <label htmlFor="street">Street</label>
          <input type="text" name="street" />
        </div>
        <div className="control-row">
          <div className="control">
            <label htmlFor="postal-code">Postal Code</label>
            <input type="text" name="postal-code" />
          </div>
          <div className="control">
            <label htmlFor="city">City</label>
            <input type="text" name="city" />
          </div>
        </div>
        {!inputIsValid && <p className="invalid-input">Invalid Input!</p>}

        <div className="modal-actions">
          <button
            onClick={ctx.closeCheckoutModal}
            type="reset"
            className="text-button"
          >
            Close
          </button>
          <button type="submit" className="button">
            Submit Order
          </button>
        </div>
      </form>
    </dialog>
  );
});

export default Checkout;
