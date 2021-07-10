const { docs } = require("../functions/docs/docs.json");

const takeRole = async (client, message, args, name, code) => {

    let r = code.split("$takeRole[").length - 1

    let inside = code.split("$takeRole[")[r].split("]")[0]

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

    if (!member.roles.cache.has(role.id)) return message.channel.send(`:x: \`${member.user.tag}\` does not have the \`${role.name}\` role in \`$takeRole[${inside}]\`.\n${docs.action}/takerole.\nCheck with **$hasRole**.\n${docs.conditions}/hasrole.`)

    member = await member.roles.remove(role.id, reason).catch(err => { })

    if (!member && err === undefined) return message.channel.send(`:x: Failed to remove role. Check bot/user permissions and hoisting hiearchy.\n${docs.action}/takerole`)
    else if (!member && err !== undefined) return message.channel.send(err).catch(err => { })

    code = code.replaceLast(`$takeRole[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = takeRole