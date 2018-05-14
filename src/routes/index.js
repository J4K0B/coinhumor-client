import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import CreatePost from '../views/create-post';
import Login from '../views/login';
import Navbar from '../comps/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


let firstRender = false;

export default () => {
  if(!firstRender) {
    firstRender = true;
    return (
      <React.Fragment>
        <Navbar />
        <ToastContainer />
        <Switch>
          <Route path="/create-post" component={CreatePost} />
          <Route path="/login" component={Login} />
          <Route path="/post" component={Login} />
          <Route path="/" component={Home}/>
        </Switch>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Navbar />
      <ToastContainer />
      <Switch>
        <Route path="/create-post" component={CreatePost} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Home}/>
      </Switch>
    </React.Fragment>
  );

};