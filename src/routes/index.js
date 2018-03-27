import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import CreatePost from '../views/create-post';
import Login from '../views/login';
import Navbar from '../comps/Navbar';

export default () => (
  <React.Fragment>
    <Navbar />
    <Switch>
      <Route path="/create-post" component={CreatePost} />
      <Route path="/login" component={Login} />
      <Route path="/" component={Home}/>
    </Switch>
  </React.Fragment>
);