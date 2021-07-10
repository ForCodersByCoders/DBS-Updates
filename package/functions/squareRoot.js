const { docs } = require("../functions/docs/docs.json");

const squareRoot = (client, message, args, name, code) => {

    let r = code.split("$squareRoot[").length - 1

    let inside = code.split("$squareRoot[")[r].split("]")[0]

    if (isNaN(Number(inside))) return message.channel.send(`:x: Invalid number in \`$squareRoot[${inside}]\`.\n${docs.action}/squareroot`)

    let result = Math.sqrt(inside);

    code = code.replaceLast(`$squareRoot[${inside}]`, result)

    return {
        code: code
    }
}

module.exports = squareRoot;