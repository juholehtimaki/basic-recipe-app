import React from "react";

export const Recipe = ({ title, calories, image, ingredients }) => {
  return (
    <div className="card">
      <h1>{title}</h1>
      <p>Calories: {calories}</p>
      <img src={image} alt="" width="100px" height="100px" />
      <ul>
        {ingredients.map(ingredient => {
          return <li>{ingredient}</li>;
        })}
      </ul>
    </div>
  );
};
