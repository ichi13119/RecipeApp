import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { getAllRecipes } from '../graphql/queries';

const Home = () => {
  const { loading, error 
    , data } = useQuery(getAllRecipes);

  const Recipe = recipe => {
    return (
      <div key={recipe._id}>
        <Link to={`/recipe/${recipe._id}`}>
        {recipe.name}
        {recipe.description}
        {recipe.ingredients.map((ingredient, i) => {
          return (
            <div key={i}>
              {ingredient.name}
              {ingredient.count}
            </div>
          )
        })}
        </Link>
      </div>
    )
  };

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return (
    <div>
      Home
      <div>{data.getAllRecipes.map(Recipe)}</div>
    </div>
  );
};

export default Home;