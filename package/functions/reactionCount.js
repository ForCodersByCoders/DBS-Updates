const { docs } = require("../functions/docs/docs.json");

const reactionCount = async (client, message, args, name, code) => {

    let r = code.split("$reactionCount[").length - 1

    let inside = code.split("$reactionCount[")[r].split("]")[0]

    let [channelID, messageID, emoji] = inside.split(";")
    let err = client.suppress.get(message.idd)

    let channel = await client.channels.fetch(channelID).catch(err => { })

    if (!channel && err === undefined) return message.channel.send(`:x: Invalid channel ID in \`$reactionCount[${inside}]\`.\n${docs.data}/reactioncount`)
    else if (!channel && err !== undefined) return message.channel.send(err).catch(err => { })


    let msg = await channel.messages.fetch(messageID).catch(err => { })

    if (!msg && err === undefined) return message.channel.send(`:x: Invalid message ID in \`$reactionCount[${inside}]\`.\n${docs.data}/reactioncount`)
    else if (!msg && err !== undefined) return message.channel.send(err).catch(err => { })
    let n;
    if (msg.reactions.cache.get(emoji)) n = msg.reactions.cache.get(emoji).users.cache.size;
    // else n = "undefined";


    code = code.replaceLast(`$reactionCount[${inside}]`, n)

    return {
        code: code
    }
}

module.exports = reactionCount