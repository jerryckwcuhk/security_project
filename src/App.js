import './App.css';
import React, { useState } from 'react';
import Timeline from './Timeline';
import { attack } from './attack'

function App() {
  const [message, setMessage] = useState(0)
  const [key, setKey] = useState()
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
       <Timeline key={key} M={M} S={S} color={getColor(message)}></Timeline>
        
      </div>
    </div>
  );

  function changeData(event) {
    const message = parseInt(event.target.value)
    setMessage(msg => message)
    setKey(item => `${message}_${new Date()}`)
  }
}

function getColor(message) {
  let color
  switch (message){
    case 1000:
      color = '255, 0, 0'
      break
    case 2000:
      color = '255, 165, 0'
      break
    case 3000:
      color = '0, 0, 255'
      break
    case 4000:
      color = '0, 128, 0'
      break
    default:
      color = '0, 0, 0'
  }
      
  // const r = `${Math.round(Math.random()*255)}`
  // const g = `${Math.round(Math.random()*255)}`
  // const b = `${Math.round(Math.random()*255)}`
  return color
}



export default App;
