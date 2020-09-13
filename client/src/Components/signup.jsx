import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../graphql/queries'; 

const Signup = ({ history, refetch }) => {
  const initialState = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  };
  const [signupUser] = useMutation(SIGNUP_USER);

  const [user, setUser] = useState(initialState);

  const clearState = () => {
    setUser({ ...initialState });
  };

  const claerInput = () => {
    document.getElementById("userForm").reset();
  };

  const handleChange = e => {
    const key = e.target.name;
    const value = e.target.value;
    user[key] = value;
    let userData = Object.assign({}, user);
    setUser(userData);
  };

  const handleSubmit = (e, refetch) => {
    e.preventDefault();
    signupUser({ variables: {
      username: user.username,
      email: user.email,
      password: user.password
    } }).then(async ({data}) => {
      console.log(data);
      localStorage.setItem('token', data.signupUser.token);
      await refetch();
      clearState();
      claerInput();
      history.push('/');
    });
  };

  return (
    <div>
      <div>Signup</div>
      <div>
        <form id="userForm" onSubmit={e => handleSubmit(e, refetch)}>
          <input type="text" name="username" placeholder="名前" onChange={handleChange}/>
          <input type="text" name="email" placeholder="メールアドレス" onChange={handleChange}/>
          <input type="password" name="password" placeholder="パスワード" onChange={handleChange}/>
          <input type="password" name="passwordConfirm" placeholder="パスワード再入力" onChange={handleChange}/>
          <button type="submit">登録</button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Signup);