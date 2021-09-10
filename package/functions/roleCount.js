const { docs } = require("../functions/docs/docs.json");

const roleCount = async (client, message, args, name, code, channel) => {

    const r = code.split("$roleCount").length - 1

    if (code.split("$roleCount")[r].startsWith("[")) {

        let inside = code.split("$roleCount[")[r].split("]")[0]
        let id = (inside ? inside : message.guild.id)
        let guild = client.guilds.cache.get(id)

        let err = client.suppress.get(message.idd)

        if (!guild && message && err === undefined) return message.channel.send(`:x: Invalid guild ID in \`$roleCount[${inside}]\`.\n${docs.data}/rolecount`)
        else if (!guild && message && err !== undefined) return message.channel.send(err).catch(err => { })

        code = code.replaceLast(`$roleCount[${inside}]`, guild.roles.cache.size)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$roleCount", message.guild.roles.cache.size)

        return {
            code: code
        }
    }
}
module.exports = roleCount;