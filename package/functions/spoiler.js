const { docs } = require("../functions/docs/docs.json");

const spoiler = async (client, message, args, name, code) => {

    const r = code.split("$spoiler[").length - 1
    let inside = code.split("$spoiler[")[r].split("]")[0]

    if (!inside) return message.channel.send(`:x: Missing content in \`$spoiler[${inside}]\`.\n${docs.action}/spoiler`)

    code = code.replaceLast(`$spoiler[${inside}]`, `||${inside}||`)

    return {
        code: code
    }
}

module.exports = spoiler;