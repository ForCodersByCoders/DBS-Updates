const moment = require("moment")

const dayInMonth = (client, message, args, name, code) => {

    code = code.replaceLast("$dayInMonth", moment(Date.now()).format("D"))

    return {
        code: code
    }
}

module.exports = dayInMonth