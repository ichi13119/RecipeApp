exports.resolvers = {
  Query: {
    getAllRecipes: async (root, args, { Recipe }) => {
      const allRecipes = await Recipe.find().sort({ createDate: 'desc' });
      return allRecipes;
    }
  },
  Mutation: {
    addRecipe: async (_root, { detail, ingredient }, { Recipe }) => {
      console.log(detail, ingredient);
      const newRecipe = await new Recipe({
        name: detail.name,
        description: detail.description,
        ingredients: ingredient
      }).save();
      console.log(newRecipe);
      return newRecipe;
    }
  }
};
  