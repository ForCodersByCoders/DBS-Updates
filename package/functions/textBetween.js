const { docs } = require("../functions/docs/docs.json");

const textBetween = async (client, message, args, name, code) => {

    let r = code.split("$textBetween[").length - 1

    let inside = code.split("$textBetween[")[r].split("]")[0]

    let [text, first, last] = inside.split(";")

    let err = client.suppress.get(message.idd)

    if (inside.split(";").length !== 3 && err === undefined) return message.channel.send(`:x: Invalid number of fields in \`$textBetween[${inside}]\`.\n${docs.data}/textbetween`)
    else if (inside.split(";").length !== 3 && err !== undefined) return message.channel.send(err).catch(err => { })

    let f = text.split(first).length - 1
    let result = text.split(first)[f].split(last)[0]

    code = code.replaceLast(`$textBetween[${inside}]`, result)

    return {
        code: code
    }
}

module.exports = textBetween;