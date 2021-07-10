const f = require('../../package/embed.js')
const { docs } = require("../functions/docs/docs.json");

const editMessage = async (client, message, args, name, code) => {

    let r = code.split("$editMessage[").length - 1

    let inside = code.split("$editMessage[")[r].split(/]$/gm)[0]

    let [ch, msgid, msg] = inside.split(";")

    let err = client.suppress.get(message.idd)

    let channel;
    try {
        channel = await client.channels.fetch(ch)
    } catch (error) {
        return message.channel.send(`:x: Invalid channel ID in \`$editMessage[${inside}]\`.\n${docs.action}/editmessage`)
    }


    if (!msgid) return message.channel.send(`:x: Missing Message ID in 2nd field of \`$editMessage[${inside}]\`.\n${docs.action}/editmessage`);
    if (isNaN(msgid)) return message.channel.send(`:x: Invalid Message ID given in 2nd field of \`$editMessage[${inside}]\`.\n${docs.action}/editmessage`);
    if (!msg) return message.channel.send(`:x: Empty Message given in 3rd field of \`$editMessage[${inside}]\`.\n${docs.action}/editmessage`);

    channel.messages.fetch(msgid).then(mg => {
        let m = f(msg)

        mg.edit(m.error, m.embed).catch(e => {
            message.channel.send(e.message)
        })

    }).catch(() => {
        message.channel.send(`:x: Invalid Message ID given in \`$editMessage[${inside}]\`.\n${docs.action}/editmessage`)
        return;
    })

    code = code.replaceLast(`$editMessage[${inside}]`, "")

    return {
        code: code,
    }

}

module.exports = editMessage;