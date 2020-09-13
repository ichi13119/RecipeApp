import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_RECIPE } from '../graphql/queries';

const Search = () => {
  // const [searchRecipe, setSearchRecipe] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchRecipeQuery, { loading, error, data }] = useLazyQuery(
    SEARCH_RECIPE,
    {onCompleted: () => setSearchTerm('')}
  );

  const handleChange = e => {
    setSearchTerm(e.target.value);
    // console.log(data.searchRecipe);
  };
  
  const search = () => {
    searchRecipeQuery({ variables: { searchTerm } });
    // setSearchRecipe({ data });
  }

  if (loading) return <div>Loading...</div>
  if (error) return <dov>Error...</dov>

  return (
    <div>
      Search
      <input
        type="search"
        onChange={e => handleChange(e)}
      />
      <button
      type="button"
      onClick={() => search()}
      >検索</button>
      {data ? data.searchRecipe.map(recipe => {
        return (
          <div key={recipe._id}>
            {recipe.name}
          </div>
          )
      })
      :
      <div></div>
      }
    </div>
  )
};

export default Search;