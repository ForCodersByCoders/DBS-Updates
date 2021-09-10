const { docs } = require("../functions/docs/docs.json");

const region = async (client, message, args, name, code) => {

    const r = code.split("$region").length - 1

    if (code.split("$region")[r].startsWith("[")) {

        let inside = code.split("$region[")[r].split("]")[0]
        let id = (inside ? inside : message.guild.id)
        let guild = client.guilds.cache.get(id)

        let err = client.suppress.get(message.idd)

        if (!guild && message && err === undefined) return message.channel.send(`:x: Invalid guild ID in \`$region[${inside}]\`.\n${docs.data}/region`)
        else if (!guild && message && err !== undefined) return message.channel.send(err).catch(err => { })

        code = code.replaceLast(`$region[${inside}]`, guild.region)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$region", message.guild.region)

        return {
            code: code
        }
    }
}
module.exports = region;