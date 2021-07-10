const { docs } = require("../functions/docs/docs.json");

const setBotAvatar = async (client, message, args, name, code) => {

    const r = code.split("$setBotAvatar[").length - 1

    const inside = code.split("$setBotAvatar[")[r].split("]")[0]

    const av = await client.user.setAvatar(inside).catch(err => { })

    if (!av) return message.channel.send(`:x: Invalid image URL in \`$setBotAvatar[${inside}]\`.\n${docs.action}/setbotavatar`);

    code = code.replaceLast(`$setBotAvatar[${inside}]`, "")

    return {
        code: code
    }
}
module.exports = setBotAvatar