const {docs} = require("discordbot-script/package/functions/docs/docs");

const getGuildInvite = async (client, message, args, name, code) => {

    const r = code.split("$getGuildInvite").length - 1

    if (code.split("$getGuildInvite")[r].startsWith("[")) {
        let inside = code.split("$getGuildInvite[")[r].split("]")[0]
        let id = (inside ? inside : message.guild.id)
        
        let guild = client.guilds.cache.get(id)
        let err = client.suppress.get(message.idd)
    
            if (!guild && err === undefined) return message.channel.send(`:x: Invalid guild ID in \`$getGuildInvite[${inside}]\`.\n${docs.data}/getGuildInvite`)
                else if (!guild && err !== undefined) return message.channel.send(err).catch(err => {})

        let channel = guild.channels.cache.random()

        let link = await channel.createInvite({
        maxAge: 0
        }).catch(err => {})

            if (!link) link = "undefined"
      
        code = code.replaceLast(`$getGuildInvite[${inside}]`, `discord.gg/${link.code}`)

        return {
            code: code,
        }
    } else {

        let channel = message.channel

        let link = await channel.createInvite({
        maxAge: 0
        }).catch(err => {})

            if (!link) link = "undefined"

        code = code.replaceLast("$getGuildInvite", `discord.gg/${link.code}`)
        
        return {
            code: code
        }
    }
}
module.exports = getGuildInvite