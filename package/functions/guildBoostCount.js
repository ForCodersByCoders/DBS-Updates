const {docs} = require("discordbot-script/package/functions/docs/docs");

const guildBoostCount = async (client, message, args, name, code, channel) => {

    const r = code.split("$guildBoostCount").length - 1

    if (code.split("$guildBoostCount")[r].startsWith("[")) {

        let inside = code.split("$guildBoostCount[")[r].split("]")[0]
        let id = (inside ? inside : message.guild.id)
        let guild = client.guilds.cache.get(id)

        let err = client.suppress.get(message.idd)

        if (!guild && message && err === undefined) return message.channel.send(`:x: Invalid guild ID in \`$guildBoostCount[${inside}]\`.\n${docs.data}/guildboostcount`)
        else if (!guild && message && err !== undefined) return message.channel.send(err).catch(err => {})
      
        code = code.replaceLast(`$guildBoostCount[${inside}]`, guild.premiumSubscriptionCount)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$guildBoostCount", message.guild.premiumSubscriptionCount)
        
        return {
            code: code
        }
    }
}
module.exports = guildBoostCount;