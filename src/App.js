import './App.css';
import React, { useState, useEffect } from 'react';
import Timeline from './Timeline';
import { attack } from './attack'

function App(props) {
  const [message, setMessage] = useState(0)
  let M = []
  let S = []
  if (message !== 0) {
    const result = attack(message)
    M = result.M
    S = result.S
  }
  
  
  

  return (
    <div className="App">
      <div className="App-body">
       <div className="message-wrapper">
        <button value={1000} className="message" onClick={changeData}>1000</button>
        <button value={2000} className="message" onClick={changeData}>2000</button>
        <button value={3000} className="message" onClick={changeData}>3000</button>
        <button value={4000} className="message" onClick={changeData}>4000</button>
       </div>
       <Timeline M={M} S={S} color={randomColor()}></Timeline>
        
      </div>
    </div>
  );

  function changeData(event) {
    const message = parseInt(event.target.value)
    setMessage(msg => message)
  }
}

function randomColor() {
  const r = `${Math.round(Math.random()*255)}`
  const g = `${Math.round(Math.random()*255)}`
  const b = `${Math.round(Math.random()*255)}`
  return `${r}, ${g}, ${b}`
}



export default App;
