const { docs } = require("../functions/docs/docs.json");

const channelID = async (client, message, args, name, code) => {

    const r = code.split("$channelID").length - 1

    if (code.split("$channelID")[r].startsWith("[")) {

        let inside = code.split("$channelID[")[r].split("]")[0]
        let id = (inside ? inside : message.channel.id)
        let channel = client.channels.cache.find(ch => ch.name === id) || message.guild.channels.cache.get(id)

        let err = client.suppress.get(message.idd)

        if (!channel && err === undefined) return message.channel.send(`:x: Invalid channel name in \`$channelID[${inside}]\`.\n${docs.data}/channelid`)
        else if (!channel && err !== undefined) return message.channel.send(err).catch(err => { })

        code = code.replaceLast(`$channelID[${inside}]`, channel.id)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$channelID", message.channel.id)

        return {
            code: code
        }
    }
}
module.exports = channelID;