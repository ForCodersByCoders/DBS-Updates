const moment = require("moment")

const monthInYear = async (client, message, args, name, code) => {

    code = code.replaceLast("$monthInYear", moment(Date.now()).format("M"))

    return {
        code: code
    }

}

module.exports = monthInYear