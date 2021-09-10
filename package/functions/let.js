const Discord = require("discord.js")
const Let = async (client, message, args, name, code, array, _passer, vars) => {

    let r = code.split("$let[").length - 1

    let inside = code.split("$let[")[r].split(/]$/gm)[0]

    let [varname, value] = inside.split(";")

    vars[varname] = value;

    code = code.replaceLast(`$let[${inside}]`, "")

    return {
        code: code,
        vars: vars
    }
}
module.exports = Let;