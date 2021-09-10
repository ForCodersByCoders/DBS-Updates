const { docs } = require("../functions/docs/docs.json");

const bold = async (client, message, args, name, code) => {

    const r = code.split("$bold[").length - 1
    let inside = code.split("$bold[")[r].split("]")[0]

    if (!inside) return message.channel.send(`:x: Missing content in \`$bold[${inside}]\`.\n${docs.action}/bold`)

    code = code.replaceLast(`$bold[${inside}]`, `**${inside}**`)

    return {
        code: code
    }
}

module.exports = bold;