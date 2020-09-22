import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import moment from 'moment';
import { Card } from '@material-ui/core';

import { getAllRecipes } from '../graphql/queries';

const Home = () => {
  const { loading, error 
    , data } = useQuery(getAllRecipes);

    const formatDate = date => {
      const newDate = moment(+date).format("YYYY/MM/DD");
      return `投稿日：${newDate}`;
    }

  const Recipe = recipe => {
    return (
      <Card
        className="card"
        variant="outlined"
        key={recipe._id}
      >
        <Link to={`/recipe/${recipe._id}`}>
          <div className="recipeName">{recipe.name}</div>
          <div className="recipeDesc">{recipe.description}</div>
        </Link>
        <div className="createDate">{formatDate(recipe.createDate)}</div>
        {/* {recipe.ingredients.map((ingredient, i) => {
          return (
            <div key={i}>
              {ingredient.name}
              {ingredient.count}
            </div>
          )
        })} */}
      </Card>
    )
  };

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return (
    <div>
      <div>
        <h2 className="pageTitle">Home</h2>
      </div>
      <div>
        <h4 className="subTitle">最新レシピ</h4>
      </div>
      <div className="container">{data.getAllRecipes.map(Recipe)}</div>
    </div>
  );
};

export default Home;