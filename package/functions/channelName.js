const { docs } = require("../functions/docs/docs.json");

const channelName = async (client, message, args, name, code) => {

    const r = code.split("$channelName").length - 1

    if (code.split("$channelName")[r].startsWith("[")) {

        let inside = code.split("$channelName[")[r].split("]")[0]
        let id = (inside ? inside : message.channel.id)

        let channel;
        try {
            channel = await client.channels.fetch(id)
        } catch (error) { }


        let err = client.suppress.get(message.idd)

        if (!channel && err === undefined) return message.channel.send(`:x: Invalid channel ID in \`$channelName[${inside}]\`.\n${docs.data}/channelname`)
        else if (!channel && err !== undefined) return message.channel.send(err).catch(err => { })

        code = code.replaceLast(`$channelName[${inside}]`, channel.name)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$channelName", message.channel.name)

        return {
            code: code
        }
    }
}
module.exports = channelName;