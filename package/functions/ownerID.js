const {docs} = require("../functions/docs/docs.json");

const ownerID = async (client, message, args, name, code, channel) => {

    const r = code.split("$ownerID").length - 1

    if (code.split("$ownerID")[r].startsWith("[")) {

        let inside = code.split("$ownerID[")[r].split("]")[0]
        let id = (inside ? inside : message.guild.id)
        let server = client.guilds.cache.get(id)

        let err = client.suppress.get(message.idd)

        if (!server && message && err === undefined) return message.channel.send(`:x: Invalid guild ID in \`$ownerID[${inside}]\`.\n${docs.data}/ownerid`)
        else if (!server && message && err !== undefined) return message.channel.send(err).catch(err => {})
      
        code = code.replaceLast(`$ownerID[${inside}]`, server.owner.id)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$ownerID", message.guild.owner.id)
        
        return {
            code: code
        }
    }
}
module.exports = ownerID;