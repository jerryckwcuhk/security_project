import BigNumber from 'bignumber.js';
import { call } from './server'

import { Logger } from './utils'
import { M } from './narrowMI'
import config from './config'

const { publicKey, n, B } = config

const logger = new Logger('searchSI.js')

const s1 = new BigNumber(n).dividedBy(3 * B).integerValue(BigNumber.ROUND_CEIL).toNumber()
const S = [1]

function searchSI(i, cipher) {
    // let currentSi = S[i]
    if (i === 1) {
        const matechedSI = searchFirstSI(cipher)
        S.push(matechedSI)
        return matechedSI
    }
    if (M[i - 1].length > 1) {
        const matechedSI = searchSIWithMultipleIntervals(i, cipher)
        S.push(matechedSI)
        return matechedSI
    }

    if (M[i - 1].length === 1) {
        const matchedSI = searchWithSingleInterval(i, cipher)
        S.push(matchedSI)
        return matchedSI
    }

    
}

function searchFirstSI(cipher) {
    let checkingSI = s1
    let isValid = false
    while(isValid === false) {
        isValid = checkWithServer(checkingSI, cipher)
        checkingSI += 1
    }
    const matchedSI = checkingSI - 1
    logger.log(`found matched S1: ${matchedSI}`)
    return matchedSI
}

function searchSIWithMultipleIntervals(i, cipher) {
    let checkingSI = S[i - 1] + 1
    let isValid = false
    while(isValid === false) {
        isValid = checkWithServer(checkingSI, cipher)
        checkingSI += 1
    }
    const matchedSI = checkingSI - 1
    logger.log(`found matched S${i}: ${matchedSI}`)
    return matchedSI

}

function searchWithSingleInterval(i, cipher) {
    const [a, b] = M[i - 1][0]
    let r = new BigNumber(b)
                        .multipliedBy(S[i - 1])
                        .minus(2 * B)
                        .multipliedBy(2)
                        .dividedBy(n)
                        .integerValue(BigNumber.ROUND_CEIL)
                        .toNumber()
    
    let isValid = false
    let matchedSI = null
    while(isValid === false) {
        const startS = new BigNumber(2 * B).plus(r * n).dividedBy(b).integerValue(BigNumber.ROUND_CEIL).toNumber()
        const endS = new BigNumber(3 * B).minus(1).plus(r * n).dividedBy(a).integerValue(BigNumber.ROUND_FLOOR).toNumber()
        for (let s = startS; s <= endS; s++) {
            isValid = checkWithServer(s, cipher)
            if (isValid) {
                matchedSI = s
                break;
            }
        }
        r += 1
        
    }
    logger.log(`found matched S${i}: ${matchedSI}`)
    return matchedSI
}

function checkWithServer(SI, cipher) {
    const siPowerE = new BigNumber(SI).exponentiatedBy(publicKey)
    const modifierCipher = BigNumber(cipher).multipliedBy(siPowerE).modulo(n).toNumber()
    const isValid = call(modifierCipher)
    return isValid
}

export { searchSI, S }