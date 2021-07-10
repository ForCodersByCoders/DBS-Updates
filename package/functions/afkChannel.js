const { docs } = require("../functions/docs/docs.json");

const afkChannel = async (client, message, args, name, code) => {

    const r = code.split("$afkChannel").length - 1


    if (code.split("$afkChannel")[r].startsWith("[")) {

        let inside = code.split("$afkChannel[")[r].split("]")[0]
        let id = (inside ? inside : message.guild.id)
        let server = client.guilds.cache.get(id)
        let err = client.suppress.get(message.idd)

        if (!server && message && err === undefined) return message.channel.send(`:x: Invalid guild ID in \`$afkChannel[${inside}]\`.\n${docs.data}/afkchannel`)
        else if (!server && message && err !== undefined) return message.channel.send(err).catch(err => { })

        code = code.replaceLast(`$afkChannel[${inside}]`, server.afkChannelID ? server.afkChannelID : "undefined")

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$afkChannel", message.guild.afkChannelID)

        return {
            code: code
        }
    }
}
module.exports = afkChannel;