const Discord = require("discord.js")
const Get = (client, message, args, name, code, array, _passer, vars) => {

    let r = code.split("$get[").length - 1

    let inside = code.split("$get[")[r].split("]")[0]

    let value = vars[inside];

    code = code.replaceLast(`$get[${inside}]`, value)

    return {
        code: code
    }
}
module.exports = Get;