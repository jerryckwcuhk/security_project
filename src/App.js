import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [lowerBoundLeft, setLeftValue] = useState(100);
  useEffect(changeRandomly)

  return (
    <div className="App">
      <div className="App-body">
        <div className='time-line'>
          <div className="lower-bound" style={{left: lowerBoundLeft}}></div>
          <div className="upper-bound"></div>
        </div>
        
      </div>
    </div>
  );

  function changeRandomly() {
    const id = setInterval(() => {
      const randomVal = Math.floor(Math.random() * 100);
      setLeftValue(lowerBoundLeft => randomVal)
    }, 3000)
    return () => clearInterval(id);
  }
}



export default App;
