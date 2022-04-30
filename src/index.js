import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { attack } from './attack'
import App from './App';

function randomColor() {
  const r = `${Math.round(Math.random()*255)}`
  const g = `${Math.round(Math.random()*255)}`
  const b = `${Math.round(Math.random()*255)}`
  return `${r}, ${g}, ${b}`
}

const { M, S } = attack()
ReactDOM.render(
  <React.StrictMode>
    <App M={M} S={S} color={randomColor()}/>
  </React.StrictMode>,
  document.getElementById('root')
);
