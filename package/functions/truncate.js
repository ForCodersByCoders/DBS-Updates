const { docs } = require("../functions/docs/docs.json");

const truncate = (client, message, args, name, code) => {

    let r = code.split("$truncate[").length - 1

    let inside = code.split("$truncate[")[r].split("]")[0]

    if (isNaN(Number(inside))) return message.channel.send(`:x: Invalid number in \`$truncate[${inside}]\`.\n${docs.action}/truncate`)

    let result = Math.trunc(inside)

    code = code.replaceLast(`$truncate[${inside}]`, result)

    return {
        code: code
    }
}

module.exports = truncate;