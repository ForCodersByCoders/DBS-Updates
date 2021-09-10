const f = require('../../package/embed.js')
const { docs } = require("../functions/docs/docs.json");

const editMessage = async (client, message, args, name, code) => {

    let r = code.split("$editMessage[").length - 1

    let inside = code.split("$editMessage[")[r].split(/]$/gm)[0]

    let [ch, msgid, msg] = inside.split(";")

    let channel = await client.channels.fetch(ch ? ch : message.channel.id).catch(e => { })

    if (!channel) return message.channel.send(`:x: Invalid channel ID in \`$editMessage[${inside}]\`.\n${docs.action}/editmessage`)


    if (!msgid) return message.channel.send(`:x: Missing message ID in 2nd field of \`$editMessage[${inside}]\`.\n${docs.action}/editmessage`);
    let messageID = await channel.messages.fetch(msgid).catch(e => { })

    if (!messageID) return message.channel.send(`:x: Message ID in 2nd field of \`$editMessage[${inside}] is not in that channel!\`.\n${docs.action}/editmessage`);

    if (!msg) return message.channel.send(`:x: Empty message in 3rd field of \`$editMessage[${inside}]\`.\n${docs.action}/editmessage`);

    channel.messages.fetch(msgid).then(mg => {
        let m = f(msg)

        mg.edit(m.error, m.embed).catch(e => {
            message.channel.send(`:x: Failed to edit the message authored by another user! \`$editMessage[${inside}]\`.\n${docs.action}/editmessage`)
        })

    }).catch(() => {
        return message.channel.send(`:x: Failed to edit the message! \`$editMessage[${inside}]\`.\n${docs.action}/editmessage`)
    })

    code = code.replaceLast(`$editMessage[${inside}]`, "")

    return {
        code: code,
    }

}

module.exports = editMessage;