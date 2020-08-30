exports.typeDefs = `
  type Query {
    getAllRecipe: [Recipe]
    getRecipe(_id: ID): Recipe
  }

  type Mutation {
    addRecipe (
      name: String!
      description: String!
      ingredients: String!
    ): Recipe
  }

  type Recipe {
    _id: ID
    name: String!
    description: String!
    ingredients: [Ingredient]
  }

  type Ingredient {
    name: String!
    count: String!
  }
`;