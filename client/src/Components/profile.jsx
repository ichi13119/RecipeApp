import React, { useState } from 'react';

import withAuth from './withAuth';

const initialEdit = { name: '', count: '' };

const Profile = ({ session }) => {
  const [edit, setEdit] = useState(false);
  const [list, setList] = useState(session.getCurrentUser.toBuy);
  const [editList, setEditList] = useState(initialEdit);

  // console.log(list);

  const handleEdit = (index) => {
    setEdit(!edit);
    setEditList(list[index]);
  };
  
  const saveEdit = index => {
    setEdit(false);
    const newIngredient = list.slice();
    newIngredient[index] = editList;
    setList(newIngredient);
  };

  const handleChange = e => {
    const key = e.target.name;
    const value = e.target.value;
    let newEditList = Object.assign({}, editList);
    newEditList[key] = value;
    console.log(newEditList);
    setEditList(newEditList);
  };

  return (
    <div>
      <h2 className="pageTitle">Profile</h2>
        <div>
        
        <h3 className="contentTitle">ユーザー名：{session.getCurrentUser.username}</h3>
        <h3 className="contentTitle">買い物リスト</h3>
        {/* {!edit ?
          <button
          onClick={() => handleEdit()}
          >リストを編集する</button>
          : 
          <button
          onClick={() => saveEdit()}
          >
          リストを保存する
          </button>
        } */}
        {list.map((el, i) => {
          return (
            <div
            className="toBuy"
            key={i}
            >
              <div className="listItem">
                <div className="name">{el.name}</div>
                <div className="count">{el.count}</div>
              </div>
              {/* <input
                type="text"
                name="name"
                defaultValue={el.name}
                onChange={handleChange}  
                />
                <input
                type="text"
                name="count"
                defaultValue={el.count}
                onChange={handleChange}  
                />
                {!edit ? 
                  <button
                  type="button"
                  onClick={() => handleEdit(i)}
                  >
                  編集する
                  </button>
                  :
                  <div>
                  <button
                  type="button"
                  onClick={() => saveEdit(i)}
                  >保存する</button>
                  <button
                  type="button"
                  onClick={() => handleEdit()}
                  >キャンセル</button>
                  <button>削除</button> 
                  </div>
                } */}
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default withAuth(session => session && session.getCurrentUser)(Profile);