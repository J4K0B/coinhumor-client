import React from 'react';
import { Link } from 'react-router-dom';

export default ({ name }) => (
  <Link className="tag" to={`/tag/${name}`} >
    {name}
  </Link>
); 

