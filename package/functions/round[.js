const { docs } = require("discordbot-script/package/functions/docs/docs");

const round = (client, message, args, name, code) => {

    let r = code.split("$round[").length - 1

    let inside = code.split("$round[")[r].split("]")[0]

    if (isNaN(Number(inside))) return message.channel.send(`:x: Invalid number in \`$round[${inside}]\`.\n${docs.action}/round`)

    let result = Math.round(inside)

    code = code.replaceLast(`$round[${inside}]`, result)

    return {
        code: code
    }
}

module.exports = round;