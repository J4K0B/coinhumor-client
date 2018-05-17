import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

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
          <a href="/">
            CoinHumor
          </a>
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
    const userId = localStorage.getItem('userId');
    if(!username) return (
      <nav className={`Navbar__Items Navbar__Items--right ${this.state.show ? 'Navbar__ToggleShow' : ''}`} >
        <div className={'Navbar__Link'}>
          <Link to="/login" onClick={this.toggleMenu}> Login </Link>
        </div>
      </nav>
    );
    return (
      <nav className={`Navbar__Items Navbar__Items--right ${this.state.show ? 'Navbar__ToggleShow' : ''}`}>
        <div className="Navbar__Link">
          <Link to={`/users?id=${userId}`} >Welcome, {username}! </Link>
        </div>
        <div className="Navbar__Link">
          <Link to="/create-post" onClick={this.toggleMenu}>Create Post</Link>
        </div>
        <div onClick={this.logout} className="Navbar__Link">
          Logout
        </div>
      </nav>
    );
  }
  logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this.toggleMenu();
    this.forceUpdate();
    toast.success('You successfully logged out!');
  }
  toggleMenu = () => {
    this.setState({
      show: !this.state.show,
    });
  }
}

export default Navbar;


