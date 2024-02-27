import { useEffect, useRef, useState } from 'react';
import ProductItem from './components/ProductItem';
import Header from './components/Header';
import { MealsContext } from './store/available-meals-context';
import CartModal from './components/CartModal';
import Checkout from './components/Checkout';
import Error from './components/Error';
import SuccessModal from './components/SuccessModal';
function App() {
  const cartDialog = useRef();
  const checkoutDialog = useRef();
  const successModal = useRef();
  const [meals, setMeals] = useState(null);
  const [cart, updateCart] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    try {
      fetch('http://localhost:3000/meals')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to load data');
          }
          return response.json();
        })
        .then((resData) => setMeals(resData))
        .catch((error) => setError(error));
    } catch (error) {
      setError(error);
    }
  }, []);

  function openCartHandler() {
    cartDialog.current.showModal();
  }

  function addToCartHandler(product) {
    updateCart((prevState) => {
      const updatedCart = prevState.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });

      if (!prevState.find((el) => el.id === product.id)) {
        updatedCart.push({ ...product, quantity: 1 });
      }
      return updatedCart;
    });
  }

  function incrementProductValue(product) {
    updateCart((prevState) => {
      const updatedCart = prevState.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      return updatedCart;
    });
  }

  function closeCheckoutModal() {
    checkoutDialog.current.close();
  }

  function decrementProductValue(product) {
    updateCart((prevState) => {
      const updatedCart = prevState.map((item) => {
        if (item.id === product.id) {
          if (item.quantity > 0) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return { ...item, quantity: 0 };
          }
        } else {
          return item;
        }
      });
      return updatedCart;
    });
  }
  let quantityNumber = 0;
  cart.map((item) => {
    quantityNumber += item.quantity;
  });

  let totalPrice = 0;
  cart.map((item) => {
    totalPrice += item.quantity * item.price;
  });
  function goToCheckoutHandler() {
    if (totalPrice > 0) {
      cartDialog.current.close();
      checkoutDialog.current.showModal();
    }
  }

  function updateSuccessState(value) {
    setSuccess(value);
  }
  // function successHandler() {
  //   setSuccess(true);
  // }
  useEffect(() => {
    if (success) {
      successModal.current.showModal();
      updateCart([]);
    }
  }, [success]);

  const ctxValue = {
    items: meals,
    addToCartHandler: addToCartHandler,
    cartItems: cart,
    incrementProductValue: incrementProductValue,
    decrementProductValue: decrementProductValue,
    totalPrice: totalPrice,
    goToCheckoutHandler: goToCheckoutHandler,
    closeCheckoutModal: closeCheckoutModal,
    // successHandler: successHandler,
    updateSuccessState: updateSuccessState,
  };

  return (
    <MealsContext.Provider value={ctxValue}>
      <Header
        quantityNumber={quantityNumber}
        openCart={openCartHandler}
      ></Header>
      {success && <SuccessModal ref={successModal}></SuccessModal>}
      {error && <Error message={error.message}></Error>}
      <CartModal ref={cartDialog}></CartModal>
      <Checkout ref={checkoutDialog}></Checkout>
      <div id="meals">
        {meals &&
          meals.map((meal) => {
            return <ProductItem key={meal.id} meal={meal}></ProductItem>;
          })}
      </div>
    </MealsContext.Provider>
  );
}

export default App;
