const { docs } = require("../functions/docs/docs.json");

const textBefore = async (client, message, args, name, code) => {

    let r = code.split("$textBefore[").length - 1

    let inside = code.split("$textBefore[")[r].split("]")[0]

    let [text, query] = inside.split(";")

    let err = client.suppress.get(message.idd)

    if (inside.split(";").length !== 2 && err === undefined) return message.channel.send(`:x: Invalid number of fields in \`$textBefore[${inside}]\`.\n${docs.data}/textafter`)
    else if (inside.split(";").length !== 2 && err !== undefined) return message.channel.send(err).catch(err => { })

    let result;
    result = text.split(query)[0];

    code = code.replaceLast(`$textBefore[${inside}]`, result)

    return {
        code: code
    }
}

module.exports = textBefore;