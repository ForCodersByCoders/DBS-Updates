const { docs } = require("../functions/docs/docs.json");

const setChannelPosition = async (client, message, args, name, code) => {

    let r = code.split("$setChannelPosition[").length - 1

    let inside = code.split("$setChannelPosition[")[r].split("]")[0]

    let [channelID, position] = inside.split(";");

    let channel = await client.channels.fetch(channelID).catch(err => { })

    if (!channel && err === undefined) return message.channel.send(`:x: Invalid channel ID in \`$setChannelPosition[${inside}]\`.\n${docs.action}/setchannelposition`)
    if (!position) return message.channel.send(`:x: No message provided in \`$setChannelPosition[${inside}]\`.\n${docs.action}/setchannelposition`)
    else if (!channel && err !== undefined) return message.channel.send(err).catch(err => { })

    let n = "";
    let result = await channel.setPosition(position - 1).catch(() => n = "undefined")

    result

    code = code.replaceLast(`$setChannelPosition[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = setChannelPosition