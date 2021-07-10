const { docs } = require("discordbot-script/package/functions/docs/docs");

const guildName = async (client, message, args, name, code, channel) => {

    const r = code.split("$guildName").length - 1

    if (code.split("$guildName")[r].startsWith("[")) {

        let inside = code.split("$guildName[")[r].split("]")[0]
        let id = (inside ? inside : message.guild.id)
        let guild = client.guilds.cache.get(id)

        let err = client.suppress.get(message.idd)

        if (!guild && message.channel && err === undefined) return message.channel.send(`:x: Invalid guild ID in \`$guildName[${inside}]\`.\n${docs.data}/guildname`)
        else if (!guild && message.channel && err !== undefined) return message.channel.send(err).catch(err => { })

        code = code.replaceLast(`$guildName[${inside}]`, guild.name)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$guildName", message.guild.name)

        return {
            code: code
        }
    }
}
module.exports = guildName;