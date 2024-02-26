import { useEffect, useRef, useState } from 'react';
import ProductItem from './components/ProductItem';
import Header from './components/Header';
import { MealsContext } from './store/available-meals-context';
import CartModal from './components/CartModal';
function App() {
  const cartDialog = useRef();
  const [meals, setMeals] = useState(null);
  useEffect(() => {
    fetch('http://localhost:3000/meals')
      .then((response) => {
        return response.json();
      })
      .then((resData) => setMeals(resData));
  }, []);

  const ctxValue = {
    items: meals,
  };

  function openCartHandler() {
    cartDialog.current.showModal();
  }
  // console.log(meals);

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
