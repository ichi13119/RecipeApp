import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from './Components/header';
import Home from './Components/home';
import Signin from './Components/signin';
import Signup from './Components/signup';
import AddRecipe from './Components/addRecipe';
import RecipeDetail from './Components/recipeDetail';
import ToBuy from './Components/toBuy';
import Profile from './Components/profile';

import './App.css';

const App = () => {
  return (
    <Router>
      <React.Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/tobuy" component={ToBuy} />
          <Route path="/recipe/:_id" component={RecipeDetail} />
          <Route path="/addrecipe" component={AddRecipe} />
          <Route path="/profile" component={Profile} />
          <Redirect to="/" />
        </Switch>
      </React.Fragment>
    </Router>
  );
};

export default App;
