const { docs } = require("../functions/docs/docs.json");

const messagePin = async (client, message, args, name, code) => {

    let r = code.split("$messagePin[").length - 1

    let inside = code.split("$messagePin[")[r].split("]")[0]

    let [channelID, messageID, option] = inside.split(";")

    let channel = await client.channels.fetch(channelID ? channelID : message.channel.id).catch(err => { })

    if (!channel) return message.channel.send(`:x: Invalid channel ID in 1st field of \`$messagePin[${inside}]\`.\n${docs.action}/messagepin`)

    let msg;
    try {
        msg = await channel.messages.fetch(messageID)
    } catch {
        return message.channel.send(`:x: Invalid message ID in 2nd field of \`$messagePin[${inside}]\`.\n${docs.action}/messagepin`)
    }


    let opt = option

    if (!opt) opt = ""

    if (msg.pinned === true) return message.channel.send(`:x: Message is already pinned! Catch with **$isPinned**\n\`$messagePin[${inside}]\`.\n${docs.action}/messagepin`)

    let result = await msg.pin().catch(err => { })

    if (opt === "id") opt = result
    else if (opt === "url") opt = result.url
    else if (opt === "content") opt = result.content
    else if (opt === "author") opt = result.author
    else if (opt === "channel") opt = result.channel

    code = code.replaceLast(`$messagePin[${inside}]`, opt)

    return {
        code: code
    }
}

module.exports = messagePin;