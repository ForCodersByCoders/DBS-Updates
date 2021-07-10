const { docs } = require("../functions/docs/docs.json");

const parentChannelID = async (client, message, args, name, code) => {

    const r = code.split("$parentChannelID").length - 1

    if (code.split("$parentChannelID")[r].startsWith("[")) {

        let inside = code.split("$parentChannelID[")[r].split("]")[0]
        let id = (inside ? inside : message.channel.id)
        let channel = await client.channels.fetch(id).catch(err => { })

        if (!channel) return message.channel.send(`:x: Invalid channel ID in \`$parentChannelID[${inside}]\`.\n${docs.data}/parentchannelid`)

        code = code.replaceLast(`$parentChannelID[${inside}]`, channel.parentID)

        return {
            code: code,
        }
    } else {

        code = code.replaceLast("$parentChannelID", message.channel.parentID)

        return {
            code: code
        }
    }
}
module.exports = parentChannelID;