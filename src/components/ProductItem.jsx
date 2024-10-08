import { useContext, useState } from 'react';
import { MealsContext } from '../store/available-meals-context';

export default function ProductItem(props) {
  const mealsCtx = useContext(MealsContext);

  return (
    <div className="meal-item">
      <article>
        <img
          src={`http://localhost:3000/${props.meal.image}`}
          alt={props.meal.name}
        />
        <h3>{props.meal.name}</h3>
        <div className="meal-item-description">
          <div className="meal-item-price">{`$${props.meal.price}`}</div>
          <p>{props.meal.description}</p>
          <div className="meal-item-actions">
            <button
              onClick={() => mealsCtx.addToCartHandler(props.meal)}
              className="button"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
