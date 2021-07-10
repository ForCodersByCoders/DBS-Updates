const { docs } = require("../functions/docs/docs.json");

const embed = require("../../package/embed.js")
const execute = require("../../package/bot/executeCommand.js")

const channelSendMessage = async (client, message, args, name, code) => {

    let r = code.split("$channelSendMessage[").length - 1

    let inside = code.split("$channelSendMessage[")[r].split(/]$/gm)[0]

    let [ch, msg] = inside.split(";")

    if (!ch) return message.channel.send(`:x: Channel ID is not provided \`$channelSendMessage[${inside}]\`.\n${docs.action}/channelsendmessage`)
    if (!msg) return message.channel.send(`:x: Message is not provided \`$channelSendMessage[${inside}]\`.\n${docs.action}/channelsendmessage`)

    let channel;
    try {
        channel = await client.channels.fetch(ch)
    } catch (error) {
        return message.channel.send(`:x: Invalid channel ID in \`$channelSendMessage[${inside}]\`.\n${docs.action}/channelsendmessage`)
    }

    let err = client.suppress.get(message.idd)

    if (!channel && err === undefined) return message.channel.send(`:x: Invalid channel ID in \`$channelSendMessage[${inside}]\`.\n${docs.action}/channelsendmessage`)
    else if (!channel && err !== undefined) return message.channel.send(err).catch(err => { })

    // let m = f(msg)

    // channel.send(m.error, m.embed).catch(e => {
    //   message.channel.send(e.message)
    // })

    if (msg.includes("{execute:")) {
        let m = await execute(client, message, args, msg)
        msg = m.msg;
        if (!msg) return undefined

    }
    msg = embed(msg)
    await channel.send(msg.error, msg.embed).catch(e => {
        message.channel.send(e.message)
    })


    // if (returnChannel === "yes") {
    //     returnChannel = channel.id
    // } else if (returnChannel === "true") {
    //     returnChannel = channel.id
    // } else {
    //     returnChannel = ""
    // }



    code = code.replaceLast(`$channelSendMessage[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = channelSendMessage;