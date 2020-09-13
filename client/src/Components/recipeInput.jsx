import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { addRecipeMutation } from '../graphql/queries';



const RecipeInput = () => {
  const [addRecipe] = useMutation(addRecipeMutation);

  const [details, setDetails] = useState({
    name: '',
    description: '',
    ingredient: []
  });

  const [ingredient, setIngredient] = useState({
    name: '',
    count: ''
  });

  const [ingredients, setIngredients] = useState([]);

  const changeDetails = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    details[key] = value;
    let detailsData = Object.assign({...details}, details);
    setDetails(detailsData);
  };

  const changeIngredient = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    ingredient[key] = value;
    let ingredientData = Object.assign({...ingredient}, ingredient);
    setIngredient(ingredientData);
  };

  const resetIng = () => {
    document.getElementById("ingredientName").value = '';
    document.getElementById("ingredientCount").value = '';
  };

  const addInput = () => {
    let ingredientInput = [...ingredients, ingredient];
    setIngredients(ingredientInput
      );
      setIngredient({ name: '', count: '' });
      resetIng();
    };
    
    useEffect(() => {
      setDetails({ ...details, ingredient: ingredients})
  }, [ingredients]);
  
  const allDelete = () => {
    const confirmDelete = window.confirm(
      "入力した内容を全て削除しますか？"
    );
    if(confirmDelete) {
      document.getElementById("recipe").reset();
      setDetails({ name: '', description: '' });
      setIngredient({ name: '', count: '' });
    }
  };

  const handleDelete = index => {
    const confirmDelete = window.confirm(
      "この材料を削除しますか？"
    );
    if (confirmDelete) {
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      setIngredients([...newIngredients]);
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    addRecipe({ variables: { detail: details } });
  }

  return (
    <div>
      <form id="recipe" onSubmit={e => handleSubmit(e)}>
        <input
          type="text"
          name="name"
          onChange={changeDetails}
          />
        <textarea
          name="description"
          onChange={changeDetails}
          />
        <input
          type="text"
          name="name"
          id="ingredientName"
          onChange={changeIngredient}
          />
        <input
          type="text"
          name="count"
          id="ingredientCount"
          onChange={changeIngredient}
          />
        <button type="button" onClick={() => addInput()}>追加</button>
        {ingredients.map((el, i) => {
          return(
            <div key={i}>
              {el.name}
              {el.count}
              <button type="button" onClick={() => handleDelete(i)}>x</button>
            </div>
          )
        })
        }
        <button type="button" onClick={() => allDelete()}>クリア</button>
        <button type="submit">レシピ登録</button>
      </form>
    </div>
  )
};

export default RecipeInput;