const { docs } = require("../functions/docs/docs.json");

const haste = async (client, message, args, name, code) => {
    const hastebin;
    try {
        hastebin = require("hastebin-gen")
    } catch {
        return message.channel.send(`:x: Must \`npm install hastebin-gen\` before using \`$haste\`! \`$haste[${inside}]\`.\n${docs.action}/haste`)
    }

    let r = code.split("$haste[").length - 1

    let inside = code.split("$haste[")[r].split("]")[0]

    let fields = inside.split(";")

    if (!fields[0]) return message.channel.send(`:x: Empty content in \`$haste[${inside}]\`.\n${docs.action}/haste`)

    let content = fields[0]

    let ext = fields[1]

    if (!fields[1]) ext = "txt"

    let haste;

    try {
        haste = await hastebin(content, { extension: ext })
    } catch {
        return message.channel.send(`Failed to create haste. Hastebin servers seem to be having issues.`)
    }

    code = code.replaceLast(`$haste[${inside}]`, haste)

    return {
        code: code
    }
}

module.exports = haste
