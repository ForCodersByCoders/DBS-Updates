const moment = require("moment")

const monthName = async (client, message, args, name, code) => {

    code = code.replaceLast("$monthName", moment(Date.now()).format("MMMM"))

    return {
        code: code
    }

}

module.exports = monthName