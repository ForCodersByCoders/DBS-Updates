const { docs } = require("../functions/docs/docs.json");

const isBanned = async (client, message, args, name, code) => {

    let r = code.split("$isBanned[").length - 1

    let inside = code.split("$isBanned[")[r].split("]")[0]

    let [userID, guildID] = inside.split(";")

    let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)
    if (!guild) return message.channel.send(`:x: Invalid guild ID in 2nd field of \`$isBanned[${inside}]\`.\n${docs.action}/isbanned`)

    let id = (userID ? userID : message.author.id)
    let member = await client.users.fetch(id).catch(err => { })


    if (!member && (inside.split(";").length === 1)) return message.channel.send(`:x: Invalid user ID in \`$isBanned[${inside}]\`.\n${docs.action}/isbanned`)
    if (!member && (inside.split(";").length === 2)) return message.channel.send(`:x: Invalid user ID in 1st field of \`$isBanned[${inside}]\`.\n${docs.action}/isbanned`)


    let check;
    let fetch;
    try {
        fetch = await guild.members.fetchBan(member.id)
    } catch {
        check = false
    }
    if (check !== false) {
        check = true
    }


    code = code.replaceLast(`$isBanned[${inside}]`, check)

    return {
        code: code
    }
}

module.exports = isBanned