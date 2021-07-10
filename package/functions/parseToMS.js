const convert = require("ms");
const { docs } = require("../functions/docs/docs.json");

const parseToMS = async (client, message, args, name, code) => {
    let r = code.split("$parseToMS[").length - 1
    let inside = code.split("$parseToMS[")[r].split("]")[0]
    let err = client.suppress.get(message.idd)


    if (!inside && err === undefined) return message.channel.send(`:x: No time was provided in \`$parseToMS[${inside}]\`.\n${docs.action}/parsetoms`)
    else if (!inside && err !== undefined) return message.channel.send(err).catch(err => { })


    code = code.replace(`$parseToMS[${inside}]`, convert(inside))

    return {
        code: code
    }
}
module.exports = parseToMS;