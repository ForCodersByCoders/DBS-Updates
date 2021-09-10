const { docs } = require("../functions/docs/docs.json");

const isEmbed = async (client, message, args, name, code) => {

    const r = code.split("$isEmbed[").length - 1

    const inside = code.split("$isEmbed[")[r].split("]")[0]

    const [channelID, messageID] = inside.split(";")

    const channel = await client.channels.fetch((channelID ? channelID : message.channel.id)).catch(err => { })

    if (!channel) return message.channel.send(`❌ Invalid channel ID in \`$isEmbed[${inside}]\`.\n${docs.conditions}/isembed`)

    const msg = await channel.messages.fetch(messageID).catch(err => null)

    if (!msg) return message.channel.send(`❌ Invalid message ID in \`$isEmbed[${inside}]\`.\n${docs.conditions}/isembed`)

    code = code.replaceLast(`$isEmbed[${inside}]`, msg.embeds[0] ? true : false)

    return {
        code: code
    }
}
module.exports = isEmbed;