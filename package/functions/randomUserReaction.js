const { docs } = require("../functions/docs/docs.json");

const randomUserReaction = async (client, message, args, name, code) => {

    let r = code.split("$randomUserReaction[").length - 1

    let inside = code.split("$randomUserReaction[")[r].split("]")[0]

    let [channelID, messageID, emoji] = inside.split(";")
    let err = client.suppress.get(message.idd)

    let channel = await client.channels.fetch(channelID).catch(err => { })

    if (!channel && err === undefined) return message.channel.send(`:x: Invalid channel ID in \`$randomUserReaction[${inside}]\`.\n${docs.data}/randomuserreaction`)
    else if (!channel && err !== undefined) return message.channel.send(err).catch(err => { })


    let msg = await channel.messages.fetch(messageID).catch(err => { })

    if (!msg && err === undefined) return message.channel.send(`:x: Invalid message ID in \`$randomUserReaction[${inside}]\`.\n${docs.data}/randomuserreaction`)
    else if (!msg && err !== undefined) return message.channel.send(err).catch(err => { })
    else if (!msg.reactions.cache.has(emoji)) return message.channel.send(`:x: Reaction doesn't exist on the message (${msg.url}).\n${docs.data}/randomuserreaction`);

    let reaction = msg.reactions.cache.get(emoji)
    let reacted = await reaction.users.fetch({
        limit: 100,
    })
    let final = reacted.random().id || 'undefined'

    code = code.replaceLast(`$randomUserReaction[${inside}]`, final)

    return {
        code: code
    }
}

module.exports = randomUserReaction;