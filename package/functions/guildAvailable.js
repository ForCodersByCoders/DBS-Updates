const { docs } = require("discordbot-script/package/functions/docs/docs");

const guildAvailable = async (client, message, args, name, code) => {

    const r = code.split("$guildAvailable").length - 1

    if (code.split("$guildAvailable")[r].startsWith("[")) {

        let inside = code.split("$guildAvailable[")[r].split("]")[0]
        let id = (inside ? inside : message.guild.id)
        let guild = client.guilds.cache.get(id)

        let err = client.suppress.get(message.idd)

        if (!guild && message && err === undefined) return message.channel.send(`:x: Invalid guild ID in \`$guildAvailable[${inside}]\`.\n${docs.data}/guildavailable`)
        else if (!guild && message && err !== undefined) return message.channel.send(err).catch(err => { })

        code = code.replaceLast(`$guildAvailable[${inside}]`, guild.available)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$guildAvailable", message.guild.available)

        return {
            code: code
        }
    }
}
module.exports = guildAvailable;
