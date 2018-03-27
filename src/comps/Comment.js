import React from 'react';
import { Link } from 'react-router-dom';

export default ({comment: {owner: {username, id: userId}, content}}) => (
  <div className="comment">
    <Link className="username-link" to={`/users?id=${userId}`}>{username}</Link>
    <p className="comment-content">
      {content}
    </p>
  </div>
); 

