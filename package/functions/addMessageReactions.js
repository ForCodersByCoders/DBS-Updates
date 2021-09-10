const { docs } = require("../functions/docs/docs.json");

const addMessageReactions = async (client, message, args, name, code) => {

    let r = code.split("$addMessageReactions[").length - 1

    let inside = code.split("$addMessageReactions[")[r].split("]")[0]
    let chErr = `:x: Invalid channel ID in 1st field of \`$addMessageReactions[${inside}]\`.\n${docs.action}/addmessagereactions`;
    let msgErr = `:x: Invalid message ID in 2nd field of \`$addMessageReactions[${inside}]\`. Check the message is not deleted!\n${docs.action}/addmessagereactions`;
    let finalErr = `:x: Failed to react to message. If emojis are custom, be sure the IDs of emojis are used instead of the emojis themselves!\n${docs.action}/addmessagereactions`;

    let [channelID, msgID] = inside.split(";")
    let emojis = inside.split(";").slice(2);

    let channel;
    try {
        channel = await client.channels.fetch(channelID)
        if (!channel && err === undefined) return message.channel.send(chErr)
        if (channel.type != 'text') return message.channel.send(chErr)
        else if (!channel && err !== undefined) return message.channel.send(err).catch(err => { })
    } catch {
        return message.channel.send(chErr)
    }

    let msg;
    try {
        msg = await channel.messages.fetch(msgID)
        if (!msgID && err === undefined) return message.channel.send(msgErr)
        else if (!msgID && err !== undefined) return message.channel.send(err).catch(err => { })
    } catch {
        return message.channel.send(msgErr)
    }


    emojis = emojis.filter(emoji => emoji);
    let result = "";
    emojis.forEach(async (emoji) => {
        await msg.react(emoji).catch(err => message.channel.send(finalErr))
    })
    code = code.replaceLast(`$addMessageReactions[${inside}]`, result)

    return {
        code: code
    }
}

module.exports = addMessageReactions;