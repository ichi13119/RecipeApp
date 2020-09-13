import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SIGNIN_USER } from '../graphql/queries';

const Signin = ({ history, refetch }) => {
  const initialState = {
    username: '',
    password: ''
  };

  const [user, setUser] = useState(initialState);

  const [signinUser] = useMutation(SIGNIN_USER, {
    variables: {
      username: user.username,
      password: user.password
    }
  });

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

  const handleSubmit = e => {
    e.preventDefault();
    signinUser().then(async ({data}) => {
      console.log(data)
      localStorage.setItem('token', data.signinUser.token);
      await refetch();
      clearState();
      claerInput();
      history.push('/');
    })
  }

  return (
    <div>
      <div>Signin</div>
      <div>
        <form id="userForm" onSubmit={e => handleSubmit(e)}>
          <input type="text" name="username" placeholder="名前" onChange={handleChange} />
          <input type="text" name="password" placeholder="パスワード" onChange={handleChange} />
          <button type="submit">サインイン</button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Signin);