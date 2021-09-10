const {docs} = require("discordbot-script/package/functions/docs/docs");

const guildBoostLevel = async (client, message, args, name, code, channel) => {

    const r = code.split("$guildBoostLevel").length - 1

    if (code.split("$guildBoostLevel")[r].startsWith("[")) {

        let inside = code.split("$guildBoostLevel[")[r].split("]")[0]
        let id = (inside ? inside : message.guild.id)
        let guild = client.guilds.cache.get(id)

        let err = client.suppress.get(message.idd)

        if (!guild && message && err === undefined) return message.channel.send(`:x: Invalid guild ID in \`$guildBoostLevel[${inside}]\`.\n${docs.data}/guildboostlevel`)
        else if (!guild && message && err !== undefined) return message.channel.send(err).catch(err => {})
      
        code = code.replaceLast(`$guildBoostLevel[${inside}]`, guild.premiumTier)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$guildBoostLevel", message.guild.premiumTier)
        
        return {
            code: code
        }
    }
}
module.exports = guildBoostLevel