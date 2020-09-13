const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn } );
};

exports.resolvers = {
  Query: {
    getAllRecipes: async (root, args, { Recipe }) => {
      const allRecipes = await Recipe.find().sort({ createDate: 'desc' });
      return allRecipes;
    },
    getRecipe: async (root, { _id }, { Recipe }) => {
      const recipe = await Recipe.findOne({ _id });
      return recipe;
    },
    searchRecipe: async (root, { searchTerm }, { Recipe }) => {
      if (searchTerm) {
        const searchResult = await Recipe.find({
          $text: { $search: searchTerm }
        }, {
          score: { $meta: "textScore" }
        }).sort({
          score: { $meta: "textScore" }
        });
        console.log(searchResult);
        return searchResult;
      } else {
        const recipes = await Recipe.find().sort({
          createdDate: 'desc'
        });
        console.log(recipes);
        return recipes;
      }
    },
    getCurrentUser: async (root, args, { currentUser, User }) => {
      // console.log('currentUser', currentUser);
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({ username: currentUser.username })
      .populate({
        path: 'toBuy',
        model: 'Recipe'
      });
      console.log(user);
      return user;
    },
  },
  Mutation: {
    addRecipe: async (_root, { detail }, { Recipe }) => {
      console.log(detail);
      const newRecipe = await new Recipe({
        name: detail.name,
        description: detail.description,
        ingredients: detail.ingredient
      }).save();
      console.log(newRecipe);
      return newRecipe;
    },
    signupUser: async (root, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error('既に使用されている名前です');
      }
      const newUser = await new User({
        username,
        email,
        password
      }).save();
      return { token: createToken(newUser, process.env.SECRET, '1hr') };
    },
    signinUser: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('登録されていないユーザーです');
      }
      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) {
        throw new Error('パスワードが間違っています');
      }
      return { token: createToken(user, process.env.SECRET, '1hr') };
    }
  }
};
  