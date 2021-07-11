const { docs } = require("../functions/docs/docs.json");

const italic = async (client, message, args, name, code) => {

    const r = code.split("$italic[").length - 1
    let inside = code.split("$italic[")[r].split("]")[0]

    if (!inside) return message.channel.send(`:x: Missing content in \`$italic[${inside}]\`.\n${docs.action}/italic`)

    code = code.replaceLast(`$italic[${inside}]`, `*${inside}*`)

    return {
        code: code
    }
}

module.exports = italic;