import { useEffect, useState } from 'react';
import ProductItem from './components/ProductItem';
import { MealsContext } from './store/available-meals-context';
function App() {
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
  console.log(meals);
  return (
    <MealsContext.Provider value={ctxValue}>
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
