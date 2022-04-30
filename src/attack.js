const { BigNumber } = require('bignumber.js');
const { searchSI } = require('./searchSI')
const { narrowMI, M } = require('./narrowMI')
const { Logger } = require('./utils')
const { config } = require('./config')
const { publicKey, n, m0 } = config

const logger = new Logger('attack.js')

function start() {
    attack()
}



function fakeInteceptCipher(message) {
    const binary = message.toString(2).padStart(4, '0')
    const transformedMessage = parseInt(`001011110000${binary}`, 2) // 12036
    const cipher = new BigNumber(transformedMessage).exponentiatedBy(publicKey, n).toNumber()
    logger.log(`intercepted cipher: ${cipher}`)
    return cipher
}

function attack() {
    const interceptedCipher = fakeInteceptCipher(m0) // 45190
    let i = 1
    let interval = []
    for (let i = 1; i <= 10; i++) {
        if (i === 1 || interval.length > 1 || interval[0][0] !==  interval[0][1]) {
            const matchedSI = searchSI(i, interceptedCipher)
            interval = narrowMI(i, matchedSI)
        } else {
            console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
            break;
        }
    }
}

start()

// narrowMI(0, 1338)
