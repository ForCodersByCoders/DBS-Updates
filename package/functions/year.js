const moment = require("moment")

const year = (client, message, args, name, code) => {

    code = code.replaceLast("$year", moment(Date.now()).format("YYYY"))

    return {
        code: code
    }
}

module.exports = year;