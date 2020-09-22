import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Button } from "@material-ui/core";

import { addRecipeMutation, getAllRecipes } from "../graphql/queries";

const RecipeInput = () => {
  const [addRecipe] = useMutation(addRecipeMutation, {
    refetchQueries: [{ query: getAllRecipes }],
  });

  const [details, setDetails] = useState({
    name: "",
    description: "",
    ingredient: [],
  });

  const [ingredient, setIngredient] = useState({
    name: "",
    count: "",
  });

  const [ingredients, setIngredients] = useState([]);

  const changeDetails = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    details[key] = value;
    let detailsData = Object.assign({ ...details }, details);
    setDetails(detailsData);
  };

  const changeIngredient = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    ingredient[key] = value;
    let ingredientData = Object.assign({ ...ingredient }, ingredient);
    setIngredient(ingredientData);
  };

  const resetIng = () => {
    document.getElementById("ingredientName").value = "";
    document.getElementById("ingredientCount").value = "";
  };

  const addInput = () => {
    let ingredientInput = [...ingredients, ingredient];
    setIngredients(ingredientInput);
    setIngredient({ name: "", count: "" });
    resetIng();
  };

  useEffect(() => {
    setDetails({ ...details, ingredient: ingredients });
  }, [ingredients]);

  const allDelete = () => {
    const confirmDelete = window.confirm("入力した内容を全て削除しますか？");
    if (confirmDelete) {
      document.getElementById("recipe").reset();
      setDetails({ name: "", description: "" });
      setIngredient({ name: "", count: "" });
    }
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("この材料を削除しますか？");
    if (confirmDelete) {
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      setIngredients([...newIngredients]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addRecipe({ variables: { detail: details } });
  };

  const ingredientValidate = () => {
    const { name, count } = ingredient;
    const inValid = !name || !count;
    return inValid;
  }

  const varidateForm = () => {
    const { name, description, ingredient } = details;
    const inValid = !name || !description || !ingredient;
    return inValid;
  };

  return (
    <div>
      <h2 className="pageTitle">レシピ登録</h2>
      <div>
        <form
          id="recipe"
          className="form recipe"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            className="formInput"
            type="text"
            name="name"
            placeholder="レシピ名"
            onChange={changeDetails}
          />
          <textarea
            className="formInput description"
            name="description"
            placeholder="レシピの説明"
            onChange={changeDetails}
          />
          <div className="ingredientForm">
            <input
              className="formInput ingredientName"
              type="text"
              name="name"
              id="ingredientName"
              placeholder="材料"
              onChange={changeIngredient}
              />
            <input
              className="formInput ingredientCount"
              type="text"
              name="count"
              id="ingredientCount"
              placeholder="個数"
              onChange={changeIngredient}
            />
            <Button
              type="button"
              variant="contained"
              disabled={ingredientValidate()}
              onClick={() => addInput()}
            >
              材料を追加
            </Button>
          </div>
          {ingredients.length === 0
          ?
          <div className="ingredients">登録する材料がありません</div>
          : 
          ingredients.map((el, i) => {
            return (
              <div
                className="ingredients"
                key={i}
              >
                <div className="ingredient name">{el.name}</div>
                <div className="ingredient count">{el.count}</div>
                <Button
                  className="deleteButton"
                  type="button"
                  onClick={() => handleDelete(i)}
                >
                  削除
                </Button>
              </div>
            );
          })}
          <div className="buttons">
            <Button
              type="button"
              variant="outlined"
              disabled={ingredients.length === 0}
              onClick={() => allDelete()}
            >
              クリア
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={varidateForm()}
            >
              レシピ登録
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeInput;
