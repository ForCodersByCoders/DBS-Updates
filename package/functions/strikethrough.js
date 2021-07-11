const { docs } = require("../functions/docs/docs.json");

const strikethrough = async (client, message, args, name, code) => {

    const r = code.split("$strikethrough[").length - 1
    let inside = code.split("$strikethrough[")[r].split("]")[0]

    if (!inside) return message.channel.send(`:x: Missing content in \`$strikethrough[${inside}]\`.\n${docs.action}/strikethrough`)

    code = code.replaceLast(`$strikethrough[${inside}]`, `~~${inside}~~`)

    return {
        code: code
    }
}

module.exports = strikethrough;