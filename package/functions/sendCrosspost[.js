const emb = require("discordbot-script/package/embed")

const sendCrosspost = async (client, message, args, name, code) => {
    const r = code.split("$sendCrosspost[").length - 1
    const inside = code.split("$sendCrosspost[")[r].split(/]$/gm)[0]
    const [msg, ...channelIDs] = inside.split(";")
    const m = emb(msg)

    channelIDs.map(async id => {
        const channel = await client.channels.fetch(id).catch(err => { })
        if (!channel) return message.channel.send(`:x: Invalid channel ID in \`$sendCrosspost[${inside}]\`.\n${docs.action}/sendcrosspost`)

        if (channel)
            channel.send(m.error, m.embed).catch(e => {
                message.channel.send(e.message)
            })
    })

    code = code.replaceLast(`$sendCrosspost[${inside}]`, "")

    return {
        code: code
    }
}
module.exports = sendCrosspost;