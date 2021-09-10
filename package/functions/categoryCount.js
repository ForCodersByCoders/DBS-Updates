const {docs} = require("../functions/docs/docs.json");

const categoryCount = async (client, message, args, name, code) => {

    const r = code.split("$categoryCount").length - 1

    if (code.split("$categoryCount")[r].startsWith("[")) {

        let inside = code.split("$categoryCount[")[r].split("]")[0]
        let id = (inside ? inside : message.guild.id)
        let server = client.guilds.cache.get(id)

        let err = client.suppress.get(message.idd)

        if (!server && message && err === undefined) return message.channel.send(`:x: Invalid guild ID in \`$categoryCount[${inside}]\`.\n${docs.data}/categorycount`)
        else if (!server && message && err !== undefined) return message.channel.send(err).catch(err => {})
      
        code = code.replaceLast(`$categoryCount[${inside}]`,  server.channels.cache.filter(ch => ch.type === "category").size)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$categoryCount",  message.guild.channels.cache.filter(ch => ch.type === "category").size)
        
        return {
            code: code
        }
    }
}
module.exports = categoryCount
