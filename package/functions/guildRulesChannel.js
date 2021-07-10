const {docs} = require("discordbot-script/package/functions/docs/docs");

const guildRulesChannel = async (client, message, args, name, code, channel) => {

    const r = code.split("$guildRulesChannel").length - 1

    if (code.split("$guildRulesChannel")[r].startsWith("[")) {

        let inside = code.split("$guildRulesChannel[")[r].split("]")[0]
        let id = (inside ? inside : message.guild.id)
        let guild = client.guilds.cache.get(id)

        let err = client.suppress.get(message.idd)

        if (!guild && message.channel && err === undefined) return message.channel.send(`:x: Invalid guild ID in \`$guildRulesChannel[${inside}]\`.\n${docs.data}/guildruleschannel`)
        else if (!guild && message.channel && err !== undefined) return message.channel.send(err).catch(err => {})
      
        code = code.replaceLast(`$guildRulesChannel[${inside}]`, guild.rulesChannelID)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$guildRulesChannel", message.guild.rulesChannelID)
        
        return {
            code: code
        }
    }
}
module.exports = guildRulesChannel;