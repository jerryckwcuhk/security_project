import BigNumber from 'bignumber.js';

const config = {
    n: 47053,
    publicKey: 23,
    privateKey: 2027,
    m0: 15, // original message,
    B: new BigNumber(2).exponentiatedBy(12),
    max: new BigNumber(2).exponentiatedBy(16)
}

export default config
