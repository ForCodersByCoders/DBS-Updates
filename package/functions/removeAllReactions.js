const { docs } = require("../functions/docs/docs.json");

const removeAllReactions = async (client, message, args, name, code) => {

    let r = code.split("$removeAllReactions[").length - 1

    let inside = code.split("$removeAllReactions[")[r].split("]")[0]

    let [channelID, messageID] = inside.split(";")
    let err = client.suppress.get(message.idd)

    let channel = await client.channels.fetch(channelID).catch(err => { })

    if (!channel && err === undefined) return message.channel.send(`:x: Invalid channel ID in 1st field of \`$removeAllReactions[${inside}]\`.\n${docs.action}/removeallreactions`)
    else if (!channel && err !== undefined) return message.channel.send(err).catch(err => { })


    let msg = await channel.messages.fetch(messageID).catch(err => { })

    if (!msg && err === undefined) return message.channel.send(`:x: Invalid message ID in 2nd field of \`$removeAllReactions[${inside}]\`\n${docs.action}/removeallreactions`)
    else if (!msg && err !== undefined) return message.channel.send(err).catch(err => { })
    let n = "";
    msg.reactions.removeAll().catch(() => n = "undefined");


    code = code.replaceLast(`$removeAllReactions[${inside}]`, n)

    return {
        code: code
    }
}

module.exports = removeAllReactions;