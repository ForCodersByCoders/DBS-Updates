const {docs} = require("../functions/docs/docs.json");

const botLeave = async (client, message, args, name, code) => {

    const r = code.split("$botLeave").length - 1

    if (code.split("$botLeave")[r].startsWith("[")) {

        let inside = code.split("$botLeave[")[r].split("]")[0]
        let id = (inside ? inside : message.guild.id)
        let server = client.guilds.cache.get(id)

        let err = client.suppress.get(message.idd)

        if (!server && message && err === undefined) return message.channel.send(`:x: Invalid guild ID in \`$botLeave[${inside}]\`.\n${docs.action}/botleave`)
            else if (!server && message && err !== undefined) return message.channel.send(err).catch(err => {})
      
        code = code.replaceLast(`$botLeave[${inside}]`, "")
        
    await server.leave()

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$botLeave", await message.guild.leave())
        
        return {
            code: code
        }
    }
}
module.exports = botLeave
