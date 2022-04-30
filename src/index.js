import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { attack } from './attack'
import App from './App';


const { M, S } = attack()
ReactDOM.render(
  <React.StrictMode>
    <App M={M} S={S}/>
  </React.StrictMode>,
  document.getElementById('root')
);
