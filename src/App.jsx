import { useEffect, useRef, useState } from 'react';
import ProductItem from './components/ProductItem';
import Header from './components/Header';
import { MealsContext } from './store/available-meals-context';
import CartModal from './components/CartModal';
function App() {
  const cartDialog = useRef();
  const [meals, setMeals] = useState(null);
  const [cart, updateCart] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/meals')
      .then((response) => {
        return response.json();
      })
      .then((resData) => setMeals(resData));
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

  console.log(cart);
  const ctxValue = {
    items: meals,
    addToCartHandler: addToCartHandler,
    cartItems: cart,
    incrementProductValue: incrementProductValue,
    decrementProductValue: decrementProductValue,
  };
  return (
    <MealsContext.Provider value={ctxValue}>
      <Header openCart={openCartHandler}></Header>
      <CartModal ref={cartDialog}></CartModal>
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
