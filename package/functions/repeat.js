const { docs } = require("../functions/docs/docs.json");

const repeat = async (client, message, args, name, code) => {

    const r = code.split("$repeat[").length - 1
    const inside = code.split("$repeat[")[r].split("]")[0]
    const [number, text] = inside.split(";")
    const n = Number(number)

    if (isNaN(number) || n < 1) return message.channel.send(`:x: Invalid number in 1st field of \`$repeat[${inside}]\`.\n${docs.action}/repeat`)
    if (!n) return message.channel.send(`:x: Missing content in 2nd field of \`$repeat[${inside}]\`.\n${docs.action}/repeat`)
    if (!text) return message.channel.send(`:x: Missing content in 2nd field of \`$repeat[${inside}]\`.\n${docs.action}/repeat`)

    if (text.repeat(n).length >= 2000) {
        return message.channel.send(`:x: \`$repeat\` has exceeded the character limit by \`${text.repeat(n).length - 2000}\` characters, try an output smaller than 2000!\n${docs.action}/repeat`)
    }

    code = code.replaceLast(`$repeat[${inside}]`, text.repeat(n))

    return {
        code: code
    }
}
module.exports = repeat