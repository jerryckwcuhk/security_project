import BigNumber from 'bignumber.js';
import config from './config'
import { searchSI } from './searchSI'

import { M, narrowMI } from './narrowMI'
import { S } from './searchSI'

import { Logger } from './utils'

const { publicKey, n, m0 } = config

const logger = new Logger('attack.js')



function fakeInteceptCipher(message) {
    const binary = message.toString(2).padStart(4, '0')
    const encryptionBlock = parseInt(`001011110000${binary}`, 2) // 12036
    const cipher = new BigNumber(encryptionBlock).exponentiatedBy(publicKey, n).toNumber()
    logger.log(`intercepted cipher: ${cipher}`)
    return cipher
}

function attack() {
    const interceptedCipher = fakeInteceptCipher(m0) // 45190
    let interval = null
    let i = 1
    while(i === 1 || interval.length > 1 || interval[0][0] !==  interval[0][1]) {
        const matchedSI = searchSI(i, interceptedCipher)
        interval = narrowMI(i, matchedSI)
        i += 1
    }

    const encryptionBlock = interval[0][0].toString(2)
    const originalMessage = parseInt(encryptionBlock.substr(-4), 2)
    logger.log(`original Message found: ${originalMessage}`)


    return {
        M,
        S
    }
}

export { attack }
