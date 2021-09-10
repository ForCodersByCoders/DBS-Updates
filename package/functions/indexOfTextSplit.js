const { docs } = require("../functions/docs/docs.json");

const indexOfTextSplit = (client, message, args, name, code, array) => {

    let r = code.split("$indexOfTextSplit[").length - 1

    let inside = code.split("$indexOfTextSplit[")[r].split("]")[0]

    let err = client.suppress.get(message.idd)

    if (!array.length && err === undefined) return message.channel.send(`❌ Array is empty in \`$indexOfTextSplit[${inside}]\`.\n${docs.data}/indexoftextsplit`)
    else if (!array.length && err !== undefined) return message.channel.send(err).catch(err => { })

    let n = (array.indexOf(inside)) == -1 ? undefined : array.indexOf(inside) + 1;

    code = code.replaceLast(`$indexOfTextSplit[${inside}]`, n)

    return {
        code: code
    }
}

module.exports = indexOfTextSplit;