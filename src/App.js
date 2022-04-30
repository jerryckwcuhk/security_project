import './App.css';
import React, { useState, useEffect } from 'react';
import config from './config'

function App() {
  const [lowerBoundLeft, setLowerBound] = useState(100);
  const [upperBoundLeft, setUpperBound] = useState(100);
  
  // useEffect(changeRandomly)
  const originalBoundLeft = ((2 * config.B) / (config.max)) * 100
  const width = (config.B / config.max) * 100

  return (
    <div className="App">
      <div className="App-body">
        <div className='time-line'>
          <div className="original-bound" style={{left: `${originalBoundLeft}%`, width: `${width}%` }}></div>
          <div className="lower-bound" style={{left: lowerBoundLeft}}></div>
          <div className="upper-bound" style={{left: upperBoundLeft}}></div>
        </div>
        
      </div>
    </div>
  );

  function changeRandomly() {
    const id = setInterval(() => {
      const randomVal = Math.floor(Math.random() * 100);
      setLowerBound(lowerBoundLeft => randomVal)
    }, 3000)
    return () => clearInterval(id);
  }
}



export default App;
