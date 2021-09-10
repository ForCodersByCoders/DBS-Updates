const { docs } = require("../functions/docs/docs.json");

const setChannelTopic = async (client, message, args, name, code) => {

    let r = code.split("$setChannelTopic[").length - 1

    let inside = code.split("$setChannelTopic[")[r].split("]")[0]
    let err = client.suppress.get(message.idd)

    let [channelID, msg] = inside.split(";");

    let channel = await client.channels.fetch(channelID).catch(err => { })

    if (!channel && err === undefined) return message.channel.send(`:x: Invalid channel ID in \`$setChannelTopic[${inside}]\`.\n${docs.action}/setchanneltopic`)
    else if (!channel && err !== undefined) return message.channel.send(err).catch(err => { })
    if (!msg) msg = ""

    let n = "";
    let result = await channel.setTopic(msg).catch(() => n = "undefined")

    result

    code = code.replaceLast(`$setChannelTopic[${inside}]`, "")

    return {
        code: code,
    }
}

module.exports = setChannelTopic