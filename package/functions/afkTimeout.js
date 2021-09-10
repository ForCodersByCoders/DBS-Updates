const { docs } = require("../functions/docs/docs.json");

const afkTimeout = async (client, message, args, name, code) => {

    const r = code.split("$afkTimeout").length - 1

    if (code.split("$afkTimeout")[r].startsWith("[")) {

        let inside = code.split("$afkTimeout[")[r].split("]")[0]
        let id = (inside ? inside : message.guild.id)
        let server = client.guilds.cache.get(id)

        let err = client.suppress.get(message.idd)

        if (!server && message && err === undefined) return message.channel.send(`:x: Invalid guild ID in \`$afkTimeout[${inside}]\`.\n${docs.data}/afktimeout`)
        else if (!server && message && err !== undefined) return message.channel.send(err).catch(err => { })

        if (server.afkChannelID === null) server.afkTimeout = "undefined"

        code = code.replaceLast(`$afkTimeout[${inside}]`, server.afkTimeout)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$afkTimeout", message.guild.afkTimeout)

        return {
            code: code
        }
    }
}
module.exports = afkTimeout;