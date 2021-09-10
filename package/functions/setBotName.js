const { docs } = require("../functions/docs/docs.json");

const setBotName = async (client, message, args, name, code) => {

    const r = code.split("$setBotName[").length - 1

    const inside = code.split("$setBotName[")[r].split("]")[0]

    const b = await client.user.setUsername(inside).catch(err => { })

    if (!b) return message.channel.send(`:x: Could not set the bot name in \`$setBotName[${inside}]\`.\n${docs.action}/setbotname`)

    code = code.replaceLast(`$setBotName[${inside}]`, "")

    return {
        code: code
    }
}
module.exports = setBotName