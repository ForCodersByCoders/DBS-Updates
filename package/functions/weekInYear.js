const moment = require("moment")

const weekInYear = (client, message, args, name, code) => {

    code = code.replaceLast("$weekInYear", moment(Date.now()).format("w"))

    return {
        code: code
    }
}

module.exports = weekInYear;