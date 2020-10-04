import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Button } from "@material-ui/core";

import { SIGNUP_USER } from "../graphql/queries";

const Signup = ({ history, refetch, setIndex }) => {
  const initialState = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };
  const [signupUser] = useMutation(SIGNUP_USER);

  const [user, setUser] = useState(initialState);

  const clearState = () => {
    setUser({ ...initialState });
  };

  const claerInput = () => {
    document.getElementById("userForm").reset();
  };

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    user[key] = value;
    let userData = Object.assign({}, user);
    setUser(userData);
  };

  const handleSubmit = (e, refetch) => {
    e.preventDefault();
    signupUser({
      variables: {
        username: user.username,
        email: user.email,
        password: user.password,
      },
    }).then(async ({ data }) => {
      console.log(data);
      localStorage.setItem("token", data.signupUser.token);
      await refetch();
      clearState();
      claerInput();
      history.push("/");
      setIndex(0);
    });
  };

  const varidateForm = () => {
    const {
      username,
      email,
      password,
      passwordConfirm
    } = user;
    const isValid = !username || !email || !password || password !== passwordConfirm;
    return isValid;
  };

  return (
    <div>
      <h2 className="pageTitle">Signup</h2>
      <div>
        <form
          id="userForm"
          className="form sign"
          onSubmit={(e) => handleSubmit(e, refetch)}
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
            type="text"
            name="email"
            placeholder="メールアドレス"
            onChange={handleChange}
            />
          <input
            className="formInput"
            type="password"
            name="password"
            placeholder="パスワード"
            onChange={handleChange}
            />
          <input
            className="formInput"
            type="password"
            name="passwordConfirm"
            placeholder="パスワード再入力"
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={varidateForm()}>
            登録
          </Button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Signup);
