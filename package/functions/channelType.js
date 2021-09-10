const { docs } = require("../functions/docs/docs.json");

const channelType = async (client, message, args, name, code) => {

    const r = code.split("$channelType").length - 1

    if (code.split("$channelType")[r].startsWith("[")) {

        let inside = code.split("$channelType[")[r].split("]")[0]
        let id = (inside ? inside : message.channel.id)

        let channel;
        try {
            channel = await client.channels.fetch(id)
        } catch (error) {
            return message.channel.send(`:x: Invalid channel ID in \`$channelType[${inside}]\`.\n${docs.data}/channeltype`)
        }

        let err = client.suppress.get(message.idd)

        if (!channel && err === undefined) return message.channel.send(`:x: Invalid channel ID in \`$channelType[${inside}]\`.\n${docs.data}/channeltype`)
        else if (!channel && err !== undefined) return message.channel.send(err).catch(err => { })

        if (channel.type === null) channel.type = "undefined"

        code = code.replaceLast(`$channelType[${inside}]`, channel.type)

        return {
            code: code,
        }
    } else {

        code = code.replaceLast("$channelType", message.channel.type)

        return {
            code: code
        }
    }
}
module.exports = channelType