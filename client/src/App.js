import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from './Components/header';
import Home from './Components/home';
import Signin from './Components/signin';
import Signup from './Components/signup';
import AddRecipe from './Components/addRecipe';
import RecipeDetail from './Components/recipeDetail';
import Search from './Components/search';
import ToBuy from './Components/toBuy';
import Profile from './Components/profile';

import withSession from './Components/withSesssion';

import './App.css';

const App = ({ refetch, session }) => {
  const [index, setIndex] = useState(0);

  return (
    <Router>
      <React.Fragment>
        <Header setIndex={setIndex} index={index} session={session}/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signin" render={() => <Signin refetch={refetch} />} />
          <Route path="/signup" render={() => <Signup refetch={refetch} />} />
          <Route path="/tobuy" component={ToBuy} />
          <Route path="/recipe/:_id" component={RecipeDetail} />
          <Route path="/addrecipe" component={AddRecipe} />
          <Route path="/search" component={Search} />
          <Route path="/profile" component={Profile} />
          <Redirect to="/" />
        </Switch>
      </React.Fragment>
    </Router>
  );
};

const AppWithSession = withSession(App);

export default AppWithSession;
