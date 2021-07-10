const moment = require("moment")

const semester = (client, message, args, name, code) => {

    code = code.replaceLast("$semester", moment(Date.now()).format("Q"))

    return {
        code: code
    }
}

module.exports = semester;