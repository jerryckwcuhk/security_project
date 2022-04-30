function Logger(name) {
    this.name = name
}


Logger.prototype.log = function log(message) {
    if (arguments.length > 1 || (typeof message !== 'string' && typeof message !== 'number')) {
        console.log(`[${this.name}]`, ...arguments)
        return
    }
    console.log(`[${this.name}] ${message}`)
}

Logger.prototype.hiddenLog = function log(message) {
    console.log(`[${this.name}]<hidden>${message}</hidden>`)
}

exports.Logger = Logger