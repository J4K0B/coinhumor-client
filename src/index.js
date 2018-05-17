import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import IndexController from './Indexcontroller';

ReactDOM.render(<App />, document.getElementById('root'));

//eslint-disable-next-line
const a = new IndexController(document.querySelector('.root'));