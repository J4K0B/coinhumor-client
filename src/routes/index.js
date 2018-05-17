import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import CreatePost from '../views/create-post';
import Login from '../views/login';
import Register from '../views/register';
import Verify from '../views/verify';
import Navbar from '../comps/Navbar';
import PostById from '../views/post-by-id';
import PostsByUser from '../views/posts-by-user';
import PostsByTag from '../views/posts-by-tag';
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
          <Route path="/register" component={Register} />
          <Route path="/post" component={PostById} />
          <Route path="/users" component={PostsByUser} />
          <Route path="/tag/" component={PostsByTag} />
          <Route path="/verify" component={Verify} />
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
        <Route path="/register" component={Register} />
        <Route path="/tag/" component={PostsByTag} />
        <Route path="/users" component={PostsByUser} />
        <Route path="/verify" component={Verify} />
        <Route path="/" component={Home}/>
      </Switch>
    </React.Fragment>
  );

};