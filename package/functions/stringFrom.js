const { docs } = require("../functions/docs/docs.json");

const stringFrom = async (client, message, args, name, code) => {

    const r = code.split("$stringFrom[").length - 1

    let inside = code.split("$stringFrom[")[r].split("]")[0]

    let [content, start, end] = inside.split(";")

    if (!content) return message.channel.send(`:x: Missing content from the 1st field of \`$stringFrom[${inside}]\`.\n${docs.data}/stringfrom`)
    if (isNaN(start)) return message.channel.send(`:x: Invalid number in 2nd field of \`$stringFrom[${inside}]\`.\n${docs.data}/stringfrom`)
    if (isNaN(end)) return message.channel.send(`:x: Invalid number in 3rd field of \`$stringFrom[${inside}]\`.\n${docs.data}/stringfrom`)


    let res = content.substring(start, end);

    code = code.replaceLast(`$stringFrom[${inside}]`, res)

    return {
        code: code
    }
}

module.exports = stringFrom;