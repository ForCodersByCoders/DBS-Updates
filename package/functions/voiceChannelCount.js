const { docs } = require("../functions/docs/docs.json");

const voiceChannelCount = async (client, message, args, name, code) => {

    const r = code.split("$voiceChannelCount").length - 1

    if (code.split("$voiceChannelCount")[r].startsWith("[")) {

        let inside = code.split("$voiceChannelCount[")[r].split("]")[0]

        let id = (inside ? inside : message.guild.id)
        let guild = client.guilds.cache.get(id)

        let err = client.suppress.get(message.idd)

        if (!guild && message && err === undefined) return message.channel.send(`:x: Invalid guild ID in \`$voiceChannelCount[${inside}]\`.\n${docs.data}/voicechannelcount`)
        else if (!guild && message && err !== undefined) return message.channel.send(err).catch(err => { })

        code = code.replaceLast(`$voiceChannelCount[${inside}]`, guild.channels.cache.filter(ch => ch.type === "voice").size)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$voiceChannelCount", message.guild.channels.cache.filter(ch => ch.type === "voice").size)

        return {
            code: code
        }
    }
}
module.exports = voiceChannelCount;
