const moment = require("moment")

const minute = (client, message, args, name, code) => {

    code = code.replaceLast("$minute", moment(Date.now()).format("mm"))

    return {
        code: code
    }
}

module.exports = minute;