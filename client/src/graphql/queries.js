import { gql } from '@apollo/client';

export const getAllRecipes = gql`
  query getAllRecipes {
    getAllRecipes {
      _id
      name
      description
      ingredients {
        name
        count
      }
      createDate
    }
  }
`;

export const getRecipe = gql`
  query getRecipe($_id: ID!) {
    getRecipe(_id: $_id) {
      _id
      name
      description
      ingredients {
        name
        count
      }
    }
  }
`;

export const SEARCH_RECIPE = gql`
  query searchRecipe($searchTerm: String) {
    searchRecipe(searchTerm: $searchTerm) {
      _id
      name
    }
  }
`;

export const addRecipeMutation = gql`
  mutation AddRecipe(
    $detail: DetailInput,
  ) {
    addRecipe (
      detail: $detail
    ) {
      _id
      name
      description
      ingredients {
        name
        count
      }
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation (
    $username: String!,
    $email: String!,
    $password: String!,
  ) {
    signupUser (
      username: $username,
      email: $email,
      password: $password,
    ) {
      token
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      registeredDate
      toBuy {
        name
        count
      }
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(
      username: $username,
      password: $password
    ) {
      token
    }
  }
`;