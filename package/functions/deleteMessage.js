const ms = require("ms");
const { docs } = require("../functions/docs/docs.json");

const deleteMessage = async (client, message, args, name, code) => {

    let r = code.split("$deleteMessage[").length - 1

    let inside = code.split("$deleteMessage[")[r].split("]")[0]

    let [channelID, msgID, time] = inside.split(";")


    let channel;
    try {
        channel = await client.channels.fetch(channelID)
        if (!channel) channel = message.channel.id
    } catch (error) {
        return message.channel.send(`:x: Invalid channel ID in 1st field of \`$deleteMessage[${inside}]\`.\n${docs.action}/deletemessage`)
    }


    let msg;
    try {
        msg = await channel.messages.fetch(msgID)
        if (!msg) msg = message.author.id
    } catch (error) {
        return message.channel.send(`:x: Invalid message ID in 2nd field of \`$deleteMessage[${inside}]\`.\n${docs.action}/deletemessage`)
    }


    if (time) {
        let time2 = (isNaN(time) ? ms(time) : Number(time))
        msg.delete({ timeout: time2 })
    } else { client.channels.cache.get(channelID).messages.fetch(msgID).then(m => m.delete()) }


    code = code.replaceLast(`$deleteMessage[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = deleteMessage;