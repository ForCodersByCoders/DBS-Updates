const {docs} = require("../functions/docs/docs.json");

const hasAnyRole = async (client, message, args, name, code) => {

    let r = code.split("$hasAnyRole[").length - 1

    let inside = code.split("$hasAnyRole[")[r].split("]")[0]

    let fields = inside.split(";")

    let id = (fields[0] ? fields[0] : message.author.id)

    let member = message.guild.members.cache.get(id)
    
    let err = client.suppress.get(message.idd)
    
    if (!member & err === undefined) return message.channel.send(`:x: Invalid user ID in 1st field of \`$hasAnyRole[${inside}]\`.\n${docs.conditions}/hasanyrole`)
    else if (!member && err !== undefined) return message.channel.send(err).catch(err => {})

    let result = fields.slice(1, fields.length).some(r => member.roles.cache.has(r));
    
    code = code.replaceLast(`$hasAnyRole[${inside}]`, result)

    return {
        code: code
    }
}
module.exports = hasAnyRole