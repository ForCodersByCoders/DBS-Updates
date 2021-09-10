const {docs} = require("discordbot-script/package/functions/docs/docs");

const guildID = async (client, message, args, name, code) => {

    const r = code.split("$guildID").length - 1

    if (code.split("$guildID")[r].startsWith("[")) {

        let inside = code.split("$guildID[")[r].split("]")[0]

        let guild = (client.guilds.cache.find(guild => guild.name === inside) || message.guild.id)

        let err = client.suppress.get(message.idd)

        if (!guild && message && err === undefined) return message.channel.send(`:x: Invalid guild name in \`$guildID[${inside}]\`.\n${docs.data}/guildid`)
        else if (!guild && message && err !== undefined) return message.channel.send(err).catch(err => {})
      
        code = code.replaceLast(`$guildID[${inside}]`, guild)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$guildID", message.guild.id)
        
        return {
            code: code
        }
    }
}
module.exports = guildID