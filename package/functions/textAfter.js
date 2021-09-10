const { docs } = require("../functions/docs/docs.json");

const textAfter = async (client, message, args, name, code) => {

    let r = code.split("$textAfter[").length - 1

    let inside = code.split("$textAfter[")[r].split("]")[0]

    let [text, query] = inside.split(";")

    let err = client.suppress.get(message.idd)

    if (inside.split(";").length !== 2 && err === undefined) return message.channel.send(`:x: Invalid number of fields in \`$textAfter[${inside}]\`.\n${docs.data}/textafter`)
    else if (inside.split(";").length !== 2 && err !== undefined) return message.channel.send(err).catch(err => { })

    let result;
    result = text.split(query)[1];

    code = code.replaceLast(`$textAfter[${inside}]`, result)

    return {
        code: code
    }
}

module.exports = textAfter;