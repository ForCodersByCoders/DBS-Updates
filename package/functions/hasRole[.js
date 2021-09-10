const { docs } = require("../functions/docs/docs.json");

const hasRole = async (client, message, args, name, code) => {

    let r = code.split("$hasRole[").length - 1

    let inside = code.split("$hasRole[")[r].split("]")[0]

    let [roleID, userID, guildID] = inside.split(";")

    let err = client.suppress.get(message.idd)

    let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)
    if (!guild && err === undefined) return message.channel.send(`:x: Invalid guild ID in 3rd field of \`$hasRole[${inside}]\`.\n${docs.conditions}/hasrole`)

    let role = await guild.roles.fetch(roleID).catch(e => { })
    if (!role && err === undefined) return message.channel.send(`:x: Invalid role ID in 1st field of \`$hasRole[${inside}]\`.\n${docs.conditions}/hasrole`)

    let user = await guild.members.fetch(userID ? userID : message.author.id).catch(e => { })
    if (!user && err === undefined) return message.channel.send(`:x: Invalid user ID in 2nd field of \`$hasRole[${inside}]\`.\n${docs.conditions}/hasrole`)



    if (user && user.roles.cache.find(x => x.id === role.id)) user = "true"
    else
        user = "false";

    if (!role && err === undefined) user = "undefined"

    code = code.replaceLast(`$hasRole[${inside}]`, user)

    return {
        code: code
    }
}

module.exports = hasRole;