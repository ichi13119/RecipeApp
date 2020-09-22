import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';

import { getRecipe, ADD_TOBUY, GET_CURRENT_USER } from '../graphql/queries';

const RecipeDetail = props => {
  const { _id } = props.match.params;
  const { data, loading, error } = useQuery(
    getRecipe,
    { variables: { _id } }
  );
  
  const [addToBuyMutation] = useMutation(ADD_TOBUY, {
    refetchQueries: [{ query: GET_CURRENT_USER }],
  });

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  const addToBuy = el => {
    // console.log(el);
    const username = props.session.getCurrentUser.username;
    // const toBuy = [...props.session.getCurrentUser.toBuy]
    const ingredient = [{ name: el.name, count: el.count }];
    // console.log(toBuy);
    addToBuyMutation({ variables: { username, ingredient } });
  };

  return (
    <div>
      <h2 className="pageTitle">レシピ詳細</h2>
      <div className="recipeDetail">
        <div className="recipeName">
          レシピ名：{data.getRecipe.name}
        </div>
        <div className="recipeDesc">
          レシピの説明：{data.getRecipe.description}
        </div>
        {data.getRecipe.ingredients.map((el, i) => {
          return(
            <div
              className="recipeIngredient"
              key={i}
            >
              <div className="name">
                材料：{el.name}
              </div>
              <div className="count">
                個数：{el.count}
              </div>
              <Button
                variant="contained"
                onClick={() => addToBuy(el)}
              >
                買い物リストに追加
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default RecipeDetail;