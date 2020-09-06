import { gql } from '@apollo/client';

export const getAllRecipes = gql`
  query getAllRecipes {
    getAllRecipes {
      _id
      name
      description
      ingredients {
        _id
        name
        count
      }
      createDate
    }
  }
`;

export const addRecipeMutation = gql`
  mutation AddRecipe (
    $detail: DetailInput,
    $ingredients: [IngredientInput]
  ) {
    addRecipe (
      detail: $detail,
      ingredient: $ingredients
    ) {
      _id
      name
      description
      ingredients {
        _id
        name
        count
      }
    }
  }
`;
