import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Navbar extends Component {
  render() {
    return( 
      <nav className="nav">
        <Link to="/">
          <h1>CoinHumor</h1>
        </Link>
        {this.getLogin()}
      </nav>
    );
  }
  getLogin= () => {
    const username = localStorage.getItem('username');
    if(!username) return <Link to="/login"> Login </Link>;
    return (
      <React.Fragment>
        Welcome, {username}!
        <Link to="/create-post">Post</Link>
        <button onClick={this.logout}>Logout</button>
      </React.Fragment>
    );
  }
  logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.forceUpdate();
  }
}

export default Navbar;


