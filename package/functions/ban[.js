const { docs } = require("../functions/docs/docs.json");

const ban = async (client, message, args, name, code) => {

    let r = code.split("$ban[").length - 1

    let inside = code.split("$ban[")[r].split("]")[0]

    let [userID, guildID, reason] = inside.split(";")

    let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)
    if (!guild) return message.channel.send(`:x: Invalid guild ID in 1st field of \`$ban[${inside}]\`.\n${docs.action}/ban`)

    let id = (userID ? userID : message.author.id)
    let member = await client.users.fetch(id).catch(err => { })


    if (!member && err === undefined) return message.channel.send(`:x: Invalid user ID in 2nd field of \`$ban[${inside}]\`.\n${docs.action}/ban`)
    else if (!member && err !== undefined) return message.channel.send(err).catch(err => { })


    let result = await guild.members.ban(member, reason).catch(err => { })
    if (!result) return message.channel.send(`:x: User is already banned from the guild! Catch with **$isBanned**!\n\`$ban[${inside}]\`.\n${docs.action}/ban`)

    result

    code = code.replaceLast(`$ban[${inside}]`, "");

    return {
        code: code
    }
}

module.exports = ban;