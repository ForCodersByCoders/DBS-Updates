const { docs } = require("discordbot-script/package/functions/docs/docs");

const messageExists = async (client, message, args, name, code) => {

    let r = code.split("$messageExists[").length - 1

    let inside = code.split("$messageExists[")[r].split("]")[0]

    let [channelID, messageID] = inside.split(";")

    let channel = await client.channels.fetch(channelID ? channelID : message.channel.id).catch(err => { })

    if (!channel) return message.channel.send(`:x: Invalid channel ID in 1st field of \`$messageExists[${inside}]\`.\n${docs.conditions}/messageexists`)

    let msg;
    try {
        msg = await channel.messages.fetch(messageID)
    } catch {
        msg = false
    }

    let result = msg ? true : false

    code = code.replaceLast(`$messageExists[${inside}]`, result)

    return {
        code: code
    }
}

module.exports = messageExists;