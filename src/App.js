import './App.css';
import React, { useState, useEffect } from 'react';
import config from './config'


function App(props) {
  const [itervals, setIntervals] = useState([])
  const [iteration, setIteration] = useState(1)
  
  const originalBoundLeft = getPercentage(2 * config.B)
  const width = getPercentage(config.B)

  useEffect(animate)

  

  return (
    <div className="App">
      <div className="App-body">
        <div className='time-line'>
          <div className="original-bound" style={{left: `${originalBoundLeft}%`, width: `${width}%` }}></div>
            { itervals.map(interval => {
              return (
                <div className = 'interval-bound' style={{left: `${interval[0]}%`, width: `${interval[1] - interval[0]}%` }}></div>
              )
            })
            }
        </div>
        
      </div>
    </div>
  );

  function animate() {
    const M = props.M
    const S = props.S
    if (iteration <= S.length - 1) {
      const id = setTimeout(() => {
        const randomVal = Math.ceil(Math.random() * 5);
        const MI = []
        // for (let i = 1; i <= randomVal; i++) {
        //   const bound1 = Math.floor(Math.random() * config.max);
        //   const bound2 =  Math.floor(Math.random() * config.max);
        //   const lowerBound = getPercentage(Math.min(bound1, bound2))
        //   const upperBound = getPercentage(Math.max(bound1, bound2))
          
        //   MI.push([lowerBound, upperBound])
        // }
        console.log(M[iteration])
        for (let i = 0; i < M[iteration].length; i++) {
          const lowerBound = getPercentage(M[iteration][i][0])
          const upperBound = getPercentage(M[iteration][i][1])
          
          MI.push([lowerBound, upperBound])
        }
        // console.log(MI)
        setIntervals(itervals => MI)
        setIteration(iteration => iteration + 1)
      }, 1000)
      return () => clearInterval(id);
    }
  }
}

function getPercentage(val) {
  const percentage = (val / (config.max)) * 100
  return percentage
}



export default App;
