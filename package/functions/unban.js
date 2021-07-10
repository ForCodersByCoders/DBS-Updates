const { docs } = require("../functions/docs/docs.json");

const unban = async (client, message, args, name, code) => {

    let r = code.split("$unban[").length - 1

    let inside = code.split("$unban[")[r].split("]")[0]

    let [userID, guildID, reason] = inside.split(";")
    let err = client.suppress.get(message.idd)

    let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)
    if (!guild) return message.channel.send(`:x: Invalid guild ID in 1st field of \`$unban[${inside}]\`.\n${docs.action}/unban`)

    let id = (userID ? userID : message.author.id)
    let member = await client.users.fetch(id).catch(err => { })


    if (!member && err === undefined) return message.channel.send(`:x: Invalid user ID in 2nd field of \`$unban[${inside}]\`.\n${docs.action}/unban`)
    else if (!member && err !== undefined) return message.channel.send(err).catch(err => { })

    if (!message.guild.me.hasPermission("BAN_MEMBERS") && err === undefined) return message.channel.send(`:x: Failed to unban user. Bot missing \`ban\` permission.\n${docs.action}/unban`)
    else if (!message.guild.me.hasPermission("BAN_MEMBERS") && err !== undefined) return message.channel.send(err).catch(err => { })


    let result = await guild.members.unban(member, reason).catch(err => { })
    if (!result) return message.channel.send(`:x: User is not banned from the guild! Catch with **$isBanned**!\n\`$unban[${inside}]\`.\n${docs.action}/unban`)

    result

    code = code.replaceLast(`$unban[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = unban;