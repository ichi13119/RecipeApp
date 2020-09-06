import React from 'react';

const Ingredient = (key, el) => {
  console.log(key, el);

  return (
    <div>
      {el.name}
    {/* {props.name}
    {props.count}
    <div onClick={i => handleDelete(i)}>x</div> */}
  </div>
  )
};

export default Ingredient;