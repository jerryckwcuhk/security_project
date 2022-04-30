import config from './config'
import React, { useState, useEffect } from 'react';

let { B, max } = config

B = B.toNumber()
max = max.toNumber()

function Timeline(props) {
    const [itervals, setIntervals] = useState([])
    const [enlargedIntervals, setEnlargedIntervals] = useState([])
    const [iteration, setIteration] = useState(1)

    const originalBoundLeft = getPercentage(2 * B)
    const width = getPercentage(B)
    useEffect(animate)

    return (
        <div className='timeline'>
          <div className="original-bound" style={{left: `${originalBoundLeft}%`, width: `${width}%`}}></div>
            { itervals.map(interval => {
              return (
                <div className = 'interval-bound' style={{left: `${interval[0]}%`, width: `${interval[1] - interval[0]}%`, borderColor: `rgb(${props.color}, 0.5)`, backgroundColor: `rgb(${props.color}, 0.5)`  }}></div>
              )
            })
            }
           <div className='zoom-in'>Zoom In Bounds</div>
           <div className='enlarged'>
            
              { 
                enlargedIntervals.map(interval => {
                  return (
                    <div className = 'enlarged-interval-bound' style={{left: `${interval[0]}%`, width: `${interval[1] - interval[0]}%`, borderColor: `rgb(${props.color})`, backgroundColor: `rgb(${props.color})`}}></div>
                  )
                })
              }
          </div>
        </div>
    )

    function animate() {
        const M = props.M
        const S = props.S
        if (iteration <= S.length - 1) {
          const id = setTimeout(() => {
            const MI = []
            const enlargedMI = []
            for (let i = 0; i < M[iteration].length; i++) {
              const lowerBound = getPercentage(M[iteration][i][0])
              const upperBound = getPercentage(M[iteration][i][1])
              const enlargedLowerbound = getPercentage((M[iteration][i][0] - 2 * B), B)
              const enlargedUpperbound = getPercentage((M[iteration][i][1] - 2 * B), B)
              MI.push([lowerBound, upperBound])
              enlargedMI.push([enlargedLowerbound, enlargedUpperbound])
            }
            setIntervals(itervals => MI)
            setEnlargedIntervals(intervals => enlargedMI)
            setIteration(iteration => iteration + 1)
          }, 1000)
          return () => clearInterval(id);
        }
    }

}


function getPercentage(val, base = max) {
    const percentage = (val / base) * 100
    return percentage
}
  

export default Timeline;