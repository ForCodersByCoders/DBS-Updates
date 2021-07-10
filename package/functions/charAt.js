const { docs } = require("../functions/docs/docs.json");

const charAt = async (client, message, args, name, code) => {

    const r = code.split("$charAt").length - 1

    let inside = code.split("$charAt[")[r].split("]")[0]

    let [text, num] = inside.split(";");

    let err = client.suppress.get(message.idd)

    if (!text && err === undefined) return message.channel.send(`:x: Missing content in 1st field of \`$charAt[${inside}]\`.\n${docs.data}/charat`)
    else if (!text && err !== undefined) return message.channel.send(err).catch(err => { })

    if (!num && err === undefined) return message.channel.send(`:x: Missing number in 2nd field of \`$charAt[${inside}]\`.\n${docs.data}/charat`)
    else if (!num && err !== undefined) return message.channel.send(err).catch(err => { })

    code = code.replaceLast(`$charAt[${inside}]`, text.charAt(num - 1) || "undefined");

    return {
        code: code
    }
}
module.exports = charAt;