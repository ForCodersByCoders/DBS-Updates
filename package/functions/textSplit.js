const Discord = require("discord.js")

const textSplit = (client, message, args, name, code, array) => {

    let r = code.split("$textSplit[").length - 1

    let inside = code.split("$textSplit[")[r].split("]")[0]

    let [text, separator] = inside.split(";")

    array = text.split(separator)

    code = code.replaceLast(`$textSplit[${inside}]`, "")

    return {
        code: code,
        array: array
    }
}

module.exports = textSplit