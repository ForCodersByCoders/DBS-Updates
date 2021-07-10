const { docs } = require("../functions/docs/docs.json");

const messageAuthorID = async (client, message, args, name, code) => {

    let r = code.split("$messageAuthorID[").length - 1

    let inside = code.split("$messageAuthorID[")[r].split("]")[0]

    let [channelID, messageID] = inside.split(";")

    let channel = await client.channels.fetch(channelID ? channelID : message.channel.id).catch(err => { })

    if (!channel) return message.channel.send(`:x: Invalid channel ID in 1st field of \`$messageAuthorID[${inside}]\`.\n${docs.data}/messageauthorid`)

    let msg;
    try {
        msg = await channel.messages.fetch(messageID)
    } catch {
        return message.channel.send(`:x: Invalid message ID in 2nd field of \`$messageAuthorID[${inside}]\`.\n${docs.data}/messageauthorid`)
    }

    let author = msg.author.id

    code = code.replaceLast(`$messageAuthorID[${inside}]`, author)

    return {
        code: code
    }
}

module.exports = messageAuthorID