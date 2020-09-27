import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { Button, Card } from "@material-ui/core";
import moment from "moment";

import { SEARCH_RECIPE } from "../graphql/queries";

const Search = () => {
  // const [searchRecipe, setSearchRecipe] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchRecipeQuery, { loading, error, data }] = useLazyQuery(
    SEARCH_RECIPE
    // {onCompleted: () => setSearchTerm('')}
  );

  const formatDate = (date) => {
    const newDate = moment(+date).format("YYYY/MM/DD");
    return `投稿日：${newDate}`;
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    // console.log(data.searchRecipe);
  };

  const search = () => {
    searchRecipeQuery({ variables: { searchTerm } });
    // setSearchRecipe({ data });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <dov>Error...</dov>;

  return (
    <div>
      <div>
        <h2 className="pageTitle">Search</h2>
      </div>
      <input
        className="searchInput"
        type="search"
        defaultValue={searchTerm}
        onChange={(e) => handleChange(e)}
      />
      <Button
        className="button"
        variant="contained"
        type="button"
        disabled={!searchTerm}
        onClick={() => search()}
      >
        検索
      </Button>
      {data ? (
        data.searchRecipe.map((recipe) => {
          return (
            <div className="container">
              <Card className="card" variant="outlined" key={recipe._id}>
                <Link to={`/recipe/${recipe._id}`}>
                  <div className="recipeName">{recipe.name}</div>
                  <div className="recipeDesc">{recipe.description}</div>
                </Link>
                <div className="createDate">
                  {formatDate(recipe.createDate)}
                </div>
              </Card>
            </div>
          );
        })
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Search;
