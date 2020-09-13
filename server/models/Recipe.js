const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ingredients: {
    type: Array
  },
  createDate: {
    type: Date,
    default: Date.now
  }
});

RecipeSchema.index({
  "$**": "text"
});

module.exports = mongoose.model('Recipe', RecipeSchema);