const { docs } = require("../functions/docs/docs.json");

const splitTextLength = (client, message, args, name, code, array) => {

    let r = code.split("$splitTextLength[").length - 1

    let inside = code.split("$splitTextLength[")[r].split("]")[0]

    let err = client.suppress.get(message.idd)


    if (!array.length && err === undefined) return message.channel.send(`:x: \`$splitTextLength[${inside}]\`: Could not find a value from a **$textSplit**.\n${docs.data}/splittextlength`)
    else if (!array.length && err !== undefined) return message.channel.send(err).catch(err => { })

    let n = array[Number(inside) - 1] || ""

    let l = array.length

    code = code.replaceLast(`$splitTextLength[${inside}]`, l)

    return {
        code: code
    }
}

module.exports = splitTextLength;