const {docs} = require("../functions/docs/docs.json");

const bansCount = async (client, message, args, name, code) => {

    const r = code.split("$bansCount").length - 1


    if (code.split("$bansCount")[r].startsWith("[")) {

        let inside = code.split("$bansCount[")[r].split("]")[0]
        let id = (inside ? inside : message.guild.id)
        let server = client.guilds.cache.get(id)

        let err = client.suppress.get(message.idd)

        if (!server && message && err === undefined) return message.channel.send(`:x: Invalid guild ID in \`$bansCount[${inside}]\`.\n${docs.data}/banscount`)
        else if (!server && message && err !== undefined) return message.channel.send(err).catch(err => {})

        let bans = await server.fetchBans()
        let check = bans.size

        code = code.replaceLast(`$bansCount[${inside}]`, check)

        return {
            code: code,
        }
    } else {
        let bans = await message.guild.fetchBans()
        let check = bans.size
        code = code.replaceLast("$bansCount", check)
        
        return {
            code: code
        }
    }
}
module.exports = bansCount;