const { docs } = require("discordbot-script/package/functions/docs/docs");

const guildIcon = async (client, message, args, name, code, channel) => {

    const r = code.split("$guildIcon").length - 1

    if (code.split("$guildIcon")[r].startsWith("[")) {

        let inside = code.split("$guildIcon[")[r].split("]")[0]
        let id = (inside ? inside : message.guild.id)
        let guild = client.guilds.cache.get(id)

        let err = client.suppress.get(message.idd)

        if (!guild && message.channel && err === undefined) return message.channel.send(`:x: Invalid guild ID in \`$guildIcon[${inside}]\`.\n${docs.data}/guildicon`)
        else if (!guild && message.channel && err !== undefined) return message.channel.send(err).catch(err => { })

        code = code.replaceLast(`$guildIcon[${inside}]`, guild.iconURL({ dynamic: true, size: 512 }))

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$guildIcon", message.guild.iconURL({ dynamic: true, size: 512 }))

        return {
            code: code
        }
    }
}
module.exports = guildIcon;