const { docs } = require("../functions/docs/docs.json");

const channelTopic = async (client, message, args, name, code) => {

    const r = code.split("$channelTopic").length - 1

    if (code.split("$channelTopic")[r].startsWith("[")) {

        let inside = code.split("$channelTopic[")[r].split("]")[0]
        let id = (inside ? inside : message.channel.id)

        let channel;
        try {
            channel = await client.channels.fetch(id)
        } catch (error) {
            return message.channel.send(`:x: Invalid channel ID in \`$channelTopic[${inside}]\`.\n${docs.data}/channeltopic`)
        }

        let err = client.suppress.get(message.idd)

        if (!channel && err === undefined) return message.channel.send(`:x: Invalid channel ID in \`$channelTopic[${inside}]\`.\n${docs.data}/channeltopic`)
        else if (!channel && err !== undefined) return message.channel.send(err).catch(err => { })

        if (channel.topic === null) channel.topic = "undefined"

        code = code.replaceLast(`$channelTopic[${inside}]`, channel.topic)

        return {
            code: code,
        }
    } else {
        let topic = message.channel.topic
        if (topic === null) t = "undefined"

        code = code.replaceLast("$channelTopic", topic)

        return {
            code: code
        }
    }
}
module.exports = channelTopic