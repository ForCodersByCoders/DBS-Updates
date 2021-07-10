const ms = require("ms");
const { docs } = require("../functions/docs/docs.json");

const deletecommand = async (client, message, args, name, code) => {

    const r = code.split("$deletecommand").length - 1

    if (code.split("$deletecommand")[r].startsWith("[")) {

        if (code.split("$deletecommand[").length >= 3) return message.channel.send(`:x: Cant use more than one \`$deletecommand\`.\n${docs.action}/deletecommand`)

        let inside = code.split("$deletecommand[")[1].split("]")[0]

        let time = (isNaN(inside) ? ms(inside) : Number(inside))

        if (!time) return message.channel.send(`:x: Invalid time in \`$deletecommand\`.\n${docs.action}/deletecommand`)

        message.delete({ timeout: time }).catch(err => { })

        code = code.replaceLast(`$deletecommand[${inside}]`, "")

        return {
            code: code,
        }
    } else {
        message.delete({ timeout: 0 }).catch(err => { })

        code = code.replaceLast("$deletecommand", "")

        return {
            code: code
        }
    }
}
module.exports = deletecommand;