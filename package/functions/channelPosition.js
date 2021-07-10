const { docs } = require("../functions/docs/docs.json");

const channelPosition = async (client, message, args, name, code) => {

    const r = code.split("$channelPosition").length - 1

    if (code.split("$channelPosition")[r].startsWith("[")) {

        let inside = code.split("$channelPosition[")[r].split("]")[0]
        let id = (inside ? inside : message.channel.id)

        let channel;
        try {
            channel = await client.channels.fetch(id)
        } catch (error) { }



        let err = client.suppress.get(message.idd)

        if (!channel && err === undefined) return message.channel.send(`:x: Invalid channel ID in \`$channelPosition[${inside}]\`.\n${docs.data}/channelposition`)
        else if (!channel && err !== undefined) return message.channel.send(err).catch(err => { })

        if (channel.type !== "text") return message.channel.send(`:x: Must be an ID of a text channel`)

        code = code.replaceLast(`$channelPosition[${inside}]`, channel.rawPosition)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$channelPosition", message.channel.rawPosition)

        return {
            code: code
        }
    }
}
module.exports = channelPosition