const moment = require("moment")

const dayInYear = (client, message, args, name, code) => {

    code = code.replaceLast("$dayInYear", moment(Date.now()).format("DDDD"))

    return {
        code: code
    }
}

module.exports = dayInYear;