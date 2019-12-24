import React, { useEffect, useState } from "react";
import config from "./config.json";
import axios from "axios";
import { Recipe } from "./Recipe";
import "./App.css";

export const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = () => {
    let url = `https://api.edamam.com/search?q=${query}&app_id=${config.MY_APP_ID}&app_key=${config.MY_APP_KEY}`;
    axios
      .get(url)
      .then(res => {
        setRecipes(res.data.hits);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    //Prevent component from refreshing
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="container">
      <form className="search-form" onSubmit={getSearch}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {recipes.map(recipe => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredientLines}
        />
      ))}
    </div>
  );
};
