const { docs } = require("../functions/docs/docs.json");

const hasRoles = async (client, message, args, name, code) => {

    let r = code.split("$hasRoles[").length - 1

    let inside = code.split("$hasRoles[")[r].split("]")[0]

    let [userID, guildID, roleID] = inside.split(";")

    let err = client.suppress.get(message.idd)

    let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)
    if (!guild && err === undefined) return message.channel.send(`:x: Invalid guild ID in 2nd field of \`$hasRole[${inside}]\`.\n${docs.conditions}/hasrole`)

    let role = await guild.roles.fetch(roleID).catch(e => { })
    if (!role && err === undefined) return message.channel.send(`:x: Invalid role ID \`$hasRole[${inside}]\`.\n${docs.conditions}/hasrole`)

    let user = await guild.members.fetch(userID ? userID : message.author.id).catch(e => { })
    if (!user && err === undefined) return message.channel.send(`:x: Invalid user ID in 1st field of \`$hasRole[${inside}]\`.\n${docs.conditions}/hasrole`)

    code = code.replaceLast(`$hasRoles[${inside}]`, user.roles.cache.has(inside.split(";").slice(2)))

    return {
        code: code
    }
}

module.exports = hasRoles;





// const { docs } = require("../functions/docs/docs.json");

// const hasRoles = async (client, message, args, name, code) => {

//     let r = code.split("$hasRoles[").length - 1

//     let inside = code.split("$hasRoles[")[r].split("]")[0]

//     let fields = inside.split(";")

//     let id = (fields[0] ? fields[0] : message.author.id)

//     let member = message.guild.members.cache.get(id)

//     let err = client.suppress.get(message.idd)

//     if (!member & err === undefined) return message.channel.send(`:x: Invalid user ID in 1st field of \`$hasRoles[${inside}]\`.\n${docs.conditions}/hasroles`)
//     else if (!member && err !== undefined) return message.channel.send(err).catch(err => { })

//     code = code.replaceLast(`$hasRoles[${inside}]`, member.roles.cache.has(inside.split(";").slice(1)))

//     return {
//         code: code
//     }
// }

// module.exports = hasRoles