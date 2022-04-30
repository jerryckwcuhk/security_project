import './App.css';
import React, { useState, useEffect } from 'react';
import Timeline from './Timeline';
import { attack } from './attack'

function App(props) {
  const { M, S } = attack()
  

  return (
    <div className="App">
      <div className="App-body">
       <div class="message"></div>
       <Timeline M={M} S={S} color={randomColor()}></Timeline>
        
      </div>
    </div>
  );
}

function randomColor() {
  const r = `${Math.round(Math.random()*255)}`
  const g = `${Math.round(Math.random()*255)}`
  const b = `${Math.round(Math.random()*255)}`
  return `${r}, ${g}, ${b}`
}



export default App;
