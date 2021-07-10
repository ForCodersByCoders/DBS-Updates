const { docs } = require("../functions/docs/docs.json");

const getSlowMode = async (client, message, args, name, code) => {

    const r = code.split("$getSlowMode").length - 1

    if (code.split("$getSlowMode")[r].startsWith("[")) {

        let inside = code.split("$getSlowMode[")[r].split("]")[0]

        let channel;
        try {
            channel = await client.channels.fetch(inside || message.channel.id)
        } catch (error) {
            return message.channel.send(`:x: Invalid channel ID in \`$getSlowMode[${inside}]\`.\n${docs.data}/getslowmode`)
        }

        let err = client.suppress.get(message.idd)

        if (!channel && message && err === undefined) return message.channel.send(`:x: Invalid channel ID in \`$getSlowMode[${inside}]\`.\n${docs.data}/getslowmode`)
        else if (!channel && message && err !== undefined) return message.channel.send(err).catch(err => { })

        code = code.replaceLast(`$getSlowMode[${inside}]`, channel.rateLimitPerUser)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$getSlowMode", message.channel.rateLimitPerUser)

        return {
            code: code
        }
    }
}
module.exports = getSlowMode;