const { docs } = require("../functions/docs/docs.json");

const messageUnpin = async (client, message, args, name, code) => {

    let r = code.split("$messageUnpin[").length - 1

    let inside = code.split("$messageUnpin[")[r].split("]")[0]

    let [channelID, messageID, option] = inside.split(";")

    let channel = await client.channels.fetch(channelID ? channelID : message.channel.id).catch(err => { })

    if (!channel) return message.channel.send(`:x: Invalid channel ID in 1st field of \`$messageUnpin[${inside}]\`.\n${docs.action}/messageunpin`)

    let msg;
    try {
        msg = await channel.messages.fetch(messageID)
    } catch {
        return message.channel.send(`:x: Invalid message ID in 2nd field of \`$messageUnpin[${inside}]\`.\n${docs.action}/messageunpin`)
    }



    let opt = option

    if (!opt) opt = ""

    if (msg.pinned === false) return message.channel.send(`:x: Message is not pinned! Catch with **$isPinned**\n\`$messagePin[${inside}]\`.\n${docs.action}/messagepin`)

    let result = await msg.unpin().catch(err => { })

    if (opt === "id") opt = result
    else if (opt === "url") opt = result.url
    else if (opt === "content") opt = result.content
    else if (opt === "author") opt = result.author
    else if (opt === "channel") opt = result.channel

    code = code.replaceLast(`$messageUnpin[${inside}]`, opt)

    return {
        code: code
    }
}

module.exports = messageUnpin;