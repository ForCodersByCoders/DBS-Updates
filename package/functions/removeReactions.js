const { docs } = require("../functions/docs/docs.json");

const removeReactions = async (client, message, args, name, code) => {

    let r = code.split("$removeReactions[").length - 1

    let inside = code.split("$removeReactions[")[r].split("]")[0]

    let [channelID, messageID] = inside.split(";")
    let emojis = inside.split(";").slice(2);

    let channel = await client.channels.fetch(channelID).catch(err => { })

    let err = client.suppress.get(message.idd)

    if (!channel && err === undefined) return message.channel.send(`:x: Invalid channel ID in \`$removeReactions[${inside}]\`\n${docs.action}/removereactions`)
    else if (!channel && err !== undefined) return message.channel.send(err).catch(err => { })

    let msg = await channel.messages.fetch(messageID).catch(err => { })

    if (!msg && err === undefined) return message.channel.send(`:x: Invalid message ID in \`$removeReactions[${inside}]\`.\n${docs.action}/removereactions`)
    else if (!msg && err !== undefined) return message.channel.send(err).catch(err => { })
    else if (!emojis.some(emoji => msg.reactions.cache.has(emoji))) return message.channel.send(`:x: Reaction doesnt exist!\n${docs.action}/removereactions`);

    let n = "";
    emojis.forEach(emoji => {
        msg.reactions.cache.get(emoji).remove().catch(() => { });
    });


    code = code.replaceLast(`$removeReactions[${inside}]`, n)

    return {
        code: code
    }
}

module.exports = removeReactions;