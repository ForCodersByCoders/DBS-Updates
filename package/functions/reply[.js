const Embed = require('../../package/embed.js')
const { docs } = require("../../package/functions/docs/docs");

const reply = async (client, message, args, name, code) => {

    let r = code.split("$reply[").length - 1
    let inside = code.split("$reply[")[r].split("]")[0]
    let [channelID, messageID, response, mention] = inside.split(";")

    let channel = await client.channels.fetch(channelID ? channelID : message.channel.id).catch(e => { })
    if (!channel) return message.channel.send(`:x: Invalid channel ID in 1st field of \`$reply[${inside}]\`.\n${docs.action}/reply`)

    let msg = await channel.messages.fetch(messageID ? messageID : message.channel.id).catch(e => { })
    if (!msg) return message.channel.send(`:x: Invalid message ID in 2nd field of \`$reply[${inside}]\`.\n${docs.action}/reply`)

    let err = client.suppress.get(message.idd)

    if (!response && err === undefined) return message.channel.send(`:x: No message provided in \`$reply[${inside}]\`.\n${docs.action}/reply`)
    else if (!response && err !== undefined) return message.channel.send(err).catch(err => { })


    let pong = (mention || 'yes').toLowerCase()
    if (!["yes", "no"].some(pog => pog === pong)) return message.channel.send(`:x: Invalid Option in 4th field of \`$reply[${inside}]\`.\n${docs.action}/reply`)

    let embed = Embed(response)


    let CHANNEL;
    try {
        CHANNEL = await client.api.channels(channel.id).messages.post({
            data: {
                content: response,
                embed: embed.embed,
                message_reference: {
                    message_id: msg.id,
                    channel_id: channel.id,
                },
                allowed_mentions: {
                    replied_user: pong.replace('yes', 'true').replace('no', 'false')
                }
            }
        })
    } catch (e) { message.channel.send('Error: ' + e) }

    code = code.replaceLast(`$reply[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = reply;