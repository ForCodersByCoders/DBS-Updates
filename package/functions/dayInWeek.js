const moment = require("moment")

const dayInWeek = (client, message, args, name, code) => {

    code = code.replaceLast("$dayInWeek", moment(Date.now()).format("E"))

    return {
        code: code
    }
}

module.exports = dayInWeek;