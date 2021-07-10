const { docs } = require("../functions/docs/docs.json");

const isNSFW = async (client, message, args, name, code) => {

    const r = code.split("$isNSFW").length - 1

    if (code.split("$isNSFW")[r].startsWith("[")) {

        let inside = code.split("$isNSFW[")[r].split("]")[0]

        if (!inside) return message.channel.send(`:x: Missing channel ID in 1st field of \`$isNSFW[${inside}]\`.\n${docs.conditions}/isnsfw`)


        let channel;
        try {
            channel = await client.channels.fetch(inside)
        } catch (error) {
            return message.channel.send(`:x: Invalid channel ID in 1st field of \`$isNSFW[${inside}]\`.\n${docs.conditions}/isnsfw`)
        }


        code = code.replaceLast(`$isNSFW[${inside}]`, channel.nsfw ? true : false)

        return {
            code: code,
        }
    } else {

        code = code.replaceLast("$isNSFW", message.channel.nsfw ? true : false)

        return {
            code: code
        }
    }
}
module.exports = isNSFW;