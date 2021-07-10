const {docs} = require("../functions/docs/docs.json");

const deleteChannels = async (client, message, args, name, code) => {

    if (code.split("$deleteChannels[").length >= 3) return message.channel.send(`:x: Cant use more than one $deleteChannels.\n${docs.action}/deletechannels`)

    let inside = code.split("$deleteChannels[")[1].split("]")[0]

    let [...ids] = inside.split(";")

    code = code.replaceLast(`$deleteChannels[${inside}]`, "")

    let handler = true

    let err = client.suppress.get(message.idd)

    if (!message.guild.me.hasPermission("MANAGE_CHANNELS") && err === undefined) return message.channel.send(`:x: Failed to delete channels. Check bot permissions.\n${docs.action}/deletechannels`);
    else if (!message.guild.me.hasPermission("MANAGE_CHANNELS") && err !== undefined) return message.channel.send(err).catch(err => {})
    ids.map(async id => {

        if (!handler) return ""

        let channel = message.guild.channels.cache.get(id)

        if (!channel) {

            handler = false

            if (err === undefined) return message.channel.send(`:x: Invalid channel ID (${id}) in \`$deleteChannels[${inside}]\`.\n${docs.action}/deletechannels`)
            else if (err !== undefined) return message.channel.send(err).catch(err => {})
        } else {
            await channel.delete().catch(err => {})
        }
    })

    await new Promise(resolve => setTimeout(resolve, 50))

    if (!handler) return ""

    return {
        code:code
    }
}

module.exports = deleteChannels