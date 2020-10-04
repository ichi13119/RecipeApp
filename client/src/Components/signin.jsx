import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';

import { SIGNIN_USER } from '../graphql/queries';

const Signin = ({ history, refetch, setIndex }) => {
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
      setIndex(0);
    })
  };

  const varidateForm = () => {
    const { username, password } = user;
    const isValid = !username || !password;
    return isValid;
  };

  return (
    <div>
      <h2 className="pageTitle">Signin</h2>
      <div>
        <form
          id="userForm"
          className="form sign"
          onSubmit={e => handleSubmit(e)}
        >
          <input
            className="formInput"
            type="text"
            name="username"
            placeholder="名前"
            onChange={handleChange}
            />
          <input
            className="formInput"
            type="password"
            name="password"
            placeholder="パスワード"
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={varidateForm()}
          >
            サインイン
          </Button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Signin);