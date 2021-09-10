const {docs} = require("discordbot-script/package/functions/docs/docs");

const guildContentFilter = async (client, message, args, name, code, channel) => {

    const r = code.split("$guildContentFilter").length - 1

    if (code.split("$guildContentFilter")[r].startsWith("[")) {

        let inside = code.split("$guildContentFilter[")[r].split("]")[0]
        let id = (inside ? inside : message.guild.id)
        let guild = client.guilds.cache.get(id)

        let err = client.suppress.get(message.idd)

        if (!guild && message && err === undefined) return message.channel.send(`:x: Invalid guild ID in \`$guildContentFilter[${inside}]\`.\n${docs.data}/guildcontentfilter`)
        else if (!guild && message && err !== undefined) return message.channel.send(err).catch(err => {})
      
        code = code.replaceLast(`$guildContentFilter[${inside}]`, guild.explicitContentFilter)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$guildContentFilter", message.guild.explicitContentFilter)
        
        return {
            code: code
        }
    }
}
module.exports = guildContentFilter;