require("discordbot-script/package/Utils/permissions");
const {docs} = require("../functions/docs/docs.json");

const hasPerm = async(client, message, args, name, code) => {

    let r = code.split("$hasPerm[").length - 1

    let inside = code.split("$hasPerm[")[r].split("]")[0]

    let [userID, perm] = inside.split(";")
    
    if (!userID) userID = message.author.id;

    let member = message.guild.members.cache.get(userID)

    let err = client.suppress.get(message.idd)

    if (!member && err === undefined) return message.channel.send(`:x: Invalid user ID in \`$hasPerm[${inside}]\`.\n${docs.conditions}/hasperm`)
    else if (!member && err !== undefined) return message.channel.send(err).catch(err => {})
    
    if (!perms[perm]) return message.channel.send(`:x: Invalid permission in \`$hasPerm[${inside}]\`.\n${docs.conditions}/hasperm`)

    code = code.replaceLast(`$hasPerm[${inside}]`, member.hasPermission(perms[perm]))

    return {
        code: code
    }
} 

module.exports = hasPerm