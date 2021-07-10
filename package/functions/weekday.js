const moment = require("moment")

const weekday = (client, message, args, name, code) => {

    code = code.replaceLast("$weekday", moment(Date.now()).format("dddd"))

    return {
        code: code
    }
}

module.exports = weekday;