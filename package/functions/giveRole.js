const { docs } = require("../functions/docs/docs.json");

const giveRole = async (client, message, args, name, code) => {

    let r = code.split("$giveRole[").length - 1

    let inside = code.split("$giveRole[")[r].split("]")[0]

    let [
        roleID,
        userID,
        guildID,
        reason = ""] = inside.split(";")

    if (!userID) userID = message.author.id

    let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)
    if (!guild) return message.channel.send(`:x: Invalid guild ID in 3rd field of \`$giveRole[${inside}]\`.\n${docs.action}/giverole`)

    let role = await guild.roles.fetch(roleID).catch(e => { })
    if (!role) return message.channel.send(`:x: Invalid role ID in 2nd field of \`$giveRole[${inside}]\`.\n${docs.action}/giverole`)

    let member = await guild.members.fetch(userID).catch(e => { })
    if (!member) return message.channel.send(`:x: Invalid user ID in 1st field of \`$giveRole[${inside}]\`.\n${docs.action}/giverole`)

    let err = client.suppress.get(message.idd)

    if (member.roles.cache.has(role.id)) return message.channel.send(`:x: \`${member.user.tag}\` already has the \`${role.name}\` role in \`$giveRole[${inside}]\`.\n${docs.action}/giverole.\nCheck with **$hasRole**.\n${docs.conditions}/hasrole.`)

    member = await member.roles.add(role.id, reason).catch(err => { })

    if (!member && err === undefined) return message.channel.send(`:x: Failed to give the role to the user. Check bot/user permissions.\n${docs.action}/giverole`)
    else if (!member && err !== undefined) return message.channel.send(err).catch(err => { })

    code = code.replaceLast(`$giveRole[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = giveRole