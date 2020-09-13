import React from 'react';
import { getRecipe } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const RecipeDetail = ({ match }) => {
  const { _id } = match.params;
  const { data, loading, error } = useQuery(
    getRecipe,
    { variables: { _id } }
  );

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  return (
    <div>
      RecipeDetail
      {data.getRecipe.name}
      {data.getRecipe.description}
      {data.getRecipe.ingredients.map((el, i) => {
        return(
          <div key={i}>
            {el.name}
            {el.count}
        </div>
          )
      })}
    </div>
  );
};

export default RecipeDetail;