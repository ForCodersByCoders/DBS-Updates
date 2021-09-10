const moment = require("moment")

const hour = (client, message, args, name, code) => {

    code = code.replaceLast("$hour", moment(Date.now()).format("HH"))

    return {
        code: code
    }
}

module.exports = hour;