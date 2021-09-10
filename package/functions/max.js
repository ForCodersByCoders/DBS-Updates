const { docs } = require("../functions/docs/docs.json");

const max = (client, message, args, name, code) => {
    let r = code.split("$max[").length - 1

    let inside = code.split("$max[")[r].split("]")[0]

    let fields = inside.split(";")

    if (isNaN(fields.join(''))) return message.channel.send(`:x: Invalid number provided in \`$max[${inside}]\`.\n${docs.data}/max`)

    code = code.replaceLast(`$max[${inside}]`, Math.max(...fields))

    return {
        code: code
    }
}

module.exports = max;