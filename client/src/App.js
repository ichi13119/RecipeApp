import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from './Components/header';
import Home from './Components/home';
import Signin from './Components/signin';
import Signup from './Components/signup';
import AddRecipe from './Components/addRecipe';
import RecipeDetail from './Components/recipeDetail';
import Search from './Components/search';
import Profile from './Components/profile';

import withSession from './Components/withSesssion';

import './App.scss';

const App = ({ refetch, session }) => {
  const [index, setIndex] = useState(0);

  return (
    <Router>
      <React.Fragment>
        <Header setIndex={setIndex} index={index} session={session}/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signin" render={() => <Signin refetch={refetch} setIndex={setIndex} />} />
          <Route path="/signup" render={() => <Signup refetch={refetch} setIndex={setIndex} />} />
          {/* <Route path="/tobuy" component={ToBuy} /> */}
          <Route path="/recipe/:_id" render={routeProps => <RecipeDetail {...routeProps} session={session} />} />
          <Route path="/addrecipe" component={AddRecipe} />
          <Route path="/search" component={Search} />
          <Route path="/profile" render={() => <Profile session={session}/>} />
          <Redirect to="/" />
        </Switch>
      </React.Fragment>
    </Router>
  );
};

const AppWithSession = withSession(App);

export default AppWithSession;
