const { docs } = require("../functions/docs/docs.json");

const isGuildVerified = async (client, message, args, name, code) => {

    const r = code.split("$isGuildVerified").length - 1

    if (code.split("$isGuildVerified")[r].startsWith("[")) {

        let inside = code.split("$isGuildVerified[")[r].split("]")[0]
        let id = (inside ? inside : message.guild.id)
        let guild = client.guilds.cache.get(id)
        let err = client.suppress.get(message.idd)

        if (!guild && err === undefined) return message.channel.send(`:x: Invalid guild ID in \`$isGuildVerified[${inside}]\`.\n${docs.conditions}/isguildverified`)
        else if (!guild && err !== undefined) return message.channel.send(err).catch(err => { })

        code = code.replaceLast(`$isGuildVerified[${inside}]`, guild.verified)

        return {
            code: code,
        }
    } else {

        code = code.replaceLast("$isGuildVerified", message.guild.verified)

        return {
            code: code
        }
    }
}
module.exports = isGuildVerified;