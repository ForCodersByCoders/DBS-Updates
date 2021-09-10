const { docs } = require("../functions/docs/docs.json");

const embed = require("../../package/embed.js")
const execute = require("../../package/bot/executeCommand.js")

const channelSendMessage = async (client, message, args, name, code) => {

    let r = code.split("$channelSendMessage[").length - 1

    let inside = code.split("$channelSendMessage[")[r].split(/]$/gm)[0]

    let [ch, msg] = inside.split(";")

    if (!ch) return message.channel.send(`:x: Channel ID is not provided in 1st field of \`$channelSendMessage[${inside}]\`.\n${docs.action}/channelsendmessage`)
    if (!msg) return message.channel.send(`:x: Message is not provided in 2nd field of \`$channelSendMessage[${inside}]\`.\n${docs.action}/channelsendmessage`)

    let channel = await client.channels.fetch(ch ? ch : message.channel.id).catch(e => { })
    if (!channel) return message.channel.send(`:x: Invalid channel ID in \`$channelSendMessage[${inside}]\`.\n${docs.action}/channelsendmessage`)


    let err = client.suppress.get(message.idd)

    if (!channel && err === undefined) return message.channel.send(`:x: Invalid channel ID in \`$channelSendMessage[${inside}]\`.\n${docs.action}/channelsendmessage`)
    else if (!channel && err !== undefined) return message.channel.send(err).catch(err => { })



    if (msg.includes("{execute:")) {
        let m = await execute(client, message, args, msg)
        msg = m.msg;
        if (!msg) return undefined

    }

    msg = embed(msg)
    await channel.send(msg.error, msg.embed).catch(e => {
        message.channel.send(e.message)
    })




    code = code.replaceLast(`$channelSendMessage[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = channelSendMessage;