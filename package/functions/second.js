const moment = require("moment")

const second = (client, message, args, name, code) => {

    code = code.replaceLast("$second", moment(Date.now()).format("ss"))

    return {
        code: code
    }
}

module.exports = second