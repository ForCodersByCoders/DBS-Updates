const {docs} = require("discordbot-script/package/functions/docs/docs");

const guildUpdatesChannel = async (client, message, args, name, code, channel) => {

    const r = code.split("$guildUpdatesChannel").length - 1

    if (code.split("$guildUpdatesChannel")[r].startsWith("[")) {

        let inside = code.split("$guildUpdatesChannel[")[r].split("]")[0]
        let id = (inside ? inside : message.guild.id)
        let guild = client.guilds.cache.get(id)

        let err = client.suppress.get(message.idd)

        if (!guild && message.channel && err === undefined) return message.channel.send(`:x: Invalid guild ID in \`$guildUpdatesChannel[${inside}]\`.\n${docs.data}/guildupdateschannel`)
        else if (!guild && message.channel && err !== undefined) return message.channel.send(err).catch(err => {})
      
        code = code.replaceLast(`$guildUpdatesChannel[${inside}]`, guild.publicUpdatesChannelID)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$guildUpdatesChannel", message.guild.publicUpdatesChannelID)
        
        return {
            code: code
        }
    }
}
module.exports = guildUpdatesChannel;