import React from 'react';
import { useMutation } from '@apollo/client';

const AddRecipe = () => {
  const addRecipe = useMutation(addRecipe);

  return (
    <div>
      <RecipeInput />
    </div>
  );
};

export default AddRecipe;