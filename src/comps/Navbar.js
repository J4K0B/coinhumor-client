import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }
  render() {
    return( 
      <div className="Navbar">
        <div className="Navbar__Link Navbar__Link-brand">
          <Link to="/">
            CoinHumor
          </Link>
        </div>
        <div className="Navbar__Link Navbar__Link-toggle" onClick={this.toggleMenu}>
          <span>☰</span>
        </div>
        {this.getLogin()}
      </div>
    );
  }
  getLogin= () => {
    const username = localStorage.getItem('username');
    if(!username) return <Link to="/login"> Login </Link>;
    return (
      <nav className={`Navbar__Items Navbar__Items--right ${this.state.show ? 'Navbar__ToggleShow' : ''}`}>
        <div className="Navbar__Link">
          Welcome, {username}!
        </div>
        <div className="Navbar__Link">
          <Link to="/create-post">Create Post</Link>
        </div>
        <div onClick={this.logout} className="Navbar__Link">
          Logout
        </div>
      </nav>
    );
  }
  logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.forceUpdate();
  }
  toggleMenu = () => {
    this.setState({
      show: !this.state.show,
    });
  }
}

export default Navbar;


