const { docs } = require("../functions/docs/docs.json");

const min = (client, message, args, name, code) => {
    let r = code.split("$min[").length - 1

    let inside = code.split("$min[")[r].split("]")[0]

    let fields = inside.split(";")

    if (isNaN(fields.join(''))) return message.channel.send(`:x: Invalid number provided in \`$min[${inside}]\`.\n${docs.data}/min`)

    code = code.replaceLast(`$min[${inside}]`, Math.min(...fields))

    return {
        code: code
    }
}

module.exports = min;