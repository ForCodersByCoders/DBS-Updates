const { docs } = require("../functions/docs/docs.json");

const voiceChannelPosition = async (client, message, args, name, code) => {

    let r = code.split("$voiceChannelPosition[").length - 1
    let inside = code.split("$voiceChannelPosition[")[r].split("]")[0]

    let channel = await client.channels.fetch(inside).catch(err => { })
    if (!channel) return message.channel.send(`:x: Invalid voice channel ID in \`$voiceChannelPosition[${inside}]\`.\n${docs.data}/voicechannelposition`)

    let ch = channel.type
    if (ch !== "voice") return message.channel.send(`:x: Must be an ID of a voice channel\n${docs.data}/voicechannelposition`)

    code = code.replaceLast(`$voiceChannelPosition[${inside}]`, channel.rawPosition)

    return {
        code: code
    }
}

module.exports = voiceChannelPosition