const { docs } = require("../functions/docs/docs.json");

const splitText = (client, message, args, name, code, array) => {

    let r = code.split("$splitText[").length - 1

    let inside = code.split("$splitText[")[r].split("]")[0]

    let err = client.suppress.get(message.idd)

    if (!array.length && err === undefined) return message.channel.send(`:x: \`$splitText[${inside}]\`: Could not find a value from a **$textSplit**.\n${docs.data}/splittext`)
    else if (!array.length && err !== undefined) return message.channel.send(err).catch(err => { })

    let n = array[Number(inside) - 1] || ""

    code = code.replaceLast(`$splitText[${inside}]`, n)

    return {
        code: code
    }
}

module.exports = splitText