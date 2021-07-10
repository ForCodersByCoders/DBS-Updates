const { docs } = require("../functions/docs/docs.json");

const roundUp = (client, message, args, name, code) => {

    let r = code.split("$roundUp[").length - 1

    let inside = code.split("$roundUp[")[r].split("]")[0]

    if (isNaN(Number(inside))) return message.channel.send(`:x: Invalid number in \`$roundUp[${inside}]\`.\n${docs.action}/roundup`)

    let result = Math.ceil(inside)

    code = code.replaceLast(`$roundUp[${inside}]`, result)

    return {
        code: code
    }
}

module.exports = roundUp;