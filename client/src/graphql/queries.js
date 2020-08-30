import gql from '@apollo/client';

export const addRecipeMutation = gql`
  mutation (
    name: String!,
    description: String!,
    ingredients: String!
  ) {
    addRecipe (
      name: $name,
      description: $description,
      ingredients: $ingredients
    ) {
      name
      description
      ingredients
    }
  }
`;