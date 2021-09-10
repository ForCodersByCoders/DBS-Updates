const ms = require("ms");
const {docs} = require("../functions/docs/docs.json");

const deleteIn = async (client, message, args, name, code) => {

    if (code.split("$deleteIn[").length >= 3) return message.channel.send(`:x: Cant use more than one \`$deleteIn\`.\n${docs.action}/deletein`)

    let inside = code.split("$deleteIn[")[1].split("]")[0]

    let time = (isNaN(inside) ? ms(inside) : Number(inside))

    client.deleteIn.set(message.idd, time)

    code = code.replace(`$deleteIn[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = deleteIn;