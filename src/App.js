import React, { useEffect, useState } from "react";
import config from "./config.json";
import axios from "axios";

export const App = () => {
  const [searchParam, setSearchParam] = useState();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {});

  function search() {
    let searchString = `https://api.edamam.com/search?q=${searchParam}&app_id=${config.MY_APP_ID}&app_key=${config.MY_APP_KEY}`;
    axios
      .get(searchString)
      .then(res => {
        let tempRecipes = [];
        for (let recipe of res.data.hits) {
          tempRecipes.push(recipe);
        }
        setRecipes(tempRecipes);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="container">
      <h1>Recipe finder</h1>
      <form className="form-inline">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={searchParam}
            onChange={e => setSearchParam(e.target.value)}
          ></input>
          <button
            type="button"
            onClick={e => search()}
            className="btn btn-primary"
          >
            Search
          </button>
        </div>
      </form>
      {recipes.map((recipe, index) => {
        return (
          <div className="card">
            <h5>{recipe.recipe.label}</h5>
            <img
              src={recipe.recipe.image}
              alt="pic of the food"
              height="100px"
              width="100px"
            />
            <ul>
              {recipe.recipe.ingredientLines.map((ingredient, index) => {
                return <li>{ingredient}</li>;
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};
