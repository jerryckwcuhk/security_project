import BigNumber from 'bignumber.js';
import { Logger } from './utils'
import intersectRanges from 'intersecting-ranges'
import config from './config'

const { B, n } = config

const logger = new Logger('narrowMI.js')

const M = [
    [
        [new BigNumber(2).multipliedBy(B).toNumber(), new BigNumber(3).multipliedBy(B).minus(1).toNumber()]
    ]
]

function narrowMI(i, SI) {
    const currentIntervals = M[i - 1]
    const R = setRI(currentIntervals, SI)
    const newIntervals = createNewIntervals(i, currentIntervals, R, SI)
    M.push(newIntervals)
    
    return newIntervals
}


function setRI(currentIntervals, SI) {
    const R = new Set()
    currentIntervals.forEach(interval => {
        const a = interval[0]
        const b = interval[1]
        const start = new BigNumber(a)
                        .multipliedBy(SI)
                        .minus(3 * B)
                        .plus(1)
                        .dividedBy(n)
                        .integerValue(BigNumber.ROUND_CEIL)
                        .toNumber()
        const end = new BigNumber(b)
                        .multipliedBy(SI)
                        .minus(2 * B)
                        .dividedBy(n)
                        .integerValue(BigNumber.ROUND_FLOOR)
                        .toNumber()
        
        for (let i = start; i <= end; i++) {
            R.add(i)
        }
    })

    return R
}

function createNewIntervals(i, currentIntervals, R, SI) {
    const tempIntervals = []
    currentIntervals.forEach(interval => {
        const a = interval[0]
        const b = interval[1]
        R.forEach((r)=> {
            const lowerBound = new BigNumber(r)
                                    .multipliedBy(n)
                                    .plus(2 * B)
                                    .dividedBy(SI)
                                    .integerValue(BigNumber.ROUND_CEIL)
                                    .toNumber()
            const upperBound = new BigNumber(r)
                                    .multipliedBy(n)
                                    .plus(3 * B)
                                    .minus(1)
                                    .dividedBy(SI)
                                    .integerValue(BigNumber.ROUND_FLOOR)
                                    .toNumber()
            const newA = Math.max(a, lowerBound)
            const newB = Math.min(b, upperBound)
            
            if (newB >= newA) tempIntervals.push([newA, newB])
            
            if (r === 233) {
                // logger.log(`r is ${r}, upper bound: ${upperBound}, lower bound ${lowerBound}`)
            }
            
        })
    })
    
    const newIntervals = intersectRanges(tempIntervals, { omitEmpty: false })
    if (tempIntervals.length > newIntervals.length) {
        logger.log(`temp interval length: ${tempIntervals.length}, New interval length: ${newIntervals.length}`)
    }
   
    logger.log(`intervals in M${i}: ${newIntervals.length}, start: ${newIntervals[0][0]}, end: ${newIntervals[newIntervals.length - 1][1]}`)
    return newIntervals
}


export { narrowMI, M }