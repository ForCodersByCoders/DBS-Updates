const moment = require("moment")

const time = (client, message, args, name, code) => {

    code = code.replaceLast("$time", moment(Date.now()).format("LT"))

    return {
        code: code
    }
}

module.exports = time