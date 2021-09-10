const { docs } = require("../functions/docs/docs.json");

const isPinned = async (client, message, args, name, code) => {

    let r = code.split("$isPinned").length - 1

    let inside = code.split("$isPinned[")[r].split("]")[0]

    let [channelID, messageID] = inside.split(";");

    let channel = await client.channels.fetch(channelID).catch(err => { })

    if (!channel) return message.channel.send(`:x: Invalid channel ID in 1st field of \`$isPinned[${inside}]\`.\n${docs.conditions}/ispinned`)

    let msg;
    try {
        msg = await channel.messages.fetch(messageID)
    } catch {
        return message.channel.send(`:x: Invalid message ID in 2nd field of \`$isPinned[${inside}]\`.\n${docs.conditions}/ispinned`)
    }

    let check;
    if (msg.pinned === true) {
        check = true
    }

    else check = false


    code = code.replaceLast(`$isPinned[${inside}]`, check)
    return {
        code: code
    }
}

module.exports = isPinned