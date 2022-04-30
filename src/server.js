import BigNumber from 'bignumber.js';
import { Logger } from './utils'
import config from './config'

const { privateKey, n } = config

function call(cipher) {
    const isSuccess = decrypt(cipher)
    return isSuccess
}

const logger = new Logger('server.js')


function decrypt(cipher) {
    const message = (new BigNumber(cipher).exponentiatedBy(privateKey, n))
    const encryptionBlock = message.toNumber()
    if(isConform(encryptionBlock)) {
        const blockLength = 4
        const binary = encryptionBlock.toString(2)
        const data = parseInt(binary.substr(-blockLength), 2)
        logger.hiddenLog(`decrypted message: ${data}`)
        return true
    }
    return false
}

function isConform(encryptionBlock) {
    const headerIndex = 0
    const paddingIndex = 4
    const tailIndex = 8
    
    const blockLength = 4
    let binary = encryptionBlock.toString(2).padStart(16, '0')
    const binaryLen = binary.length
    
    const header = binary.substr(headerIndex, blockLength)
    const padding = binary.substr(paddingIndex, blockLength)
    const tail = binary.substr(tailIndex, blockLength)

    if (header !== '0010') { // || padding !== '1111' // || tail !== '0000'
        // logger.log('Invalid Format')
        return false
    }
    return true
}

export { call }