import React from 'react';
import { Link } from 'react-router-dom';
export default () =>( 
  <nav className="nav">
    <Link to="/">
      <h1>CoinHumor</h1>
    </Link>
    <Link to="/login">
      Login 
    </Link>
  </nav>
);