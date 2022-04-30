import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { attack } from './attack'
import App from './App';


const intervals = attack()

ReactDOM.render(
  <React.StrictMode>
    <App intervals={intervals}/>
  </React.StrictMode>,
  document.getElementById('root')
);
