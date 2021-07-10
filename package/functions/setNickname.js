const { docs } = require("../functions/docs/docs.json");

const setNickname = async (client, message, args, name, code) => {

    let r = code.split("$setNickname[").length - 1

    let inside = code.split("$setNickname[")[r].split("]")[0]

    let [guildID, userID, nick] = inside.split(";")
    let err = client.suppress.get(message.idd)

    let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)
    if (!guild) return message.channel.send(`:x: Invalid guild ID in 1st field of $setNickname[${inside}].\n${docs.action}/setnickname`)


    let user = (userID ? userID : message.author.id)
    let member = await guild.members.fetch(user).catch(err => { })

    if (!member && err === undefined) return message.channel.send(`:x: Invalid user ID in 2nd field of \`$setNickname[${inside}]\`\n${docs.action}/setnickname`)
    else if (!member && err !== undefined) return message.channel.send(err).catch(err => { })


    let result = await member.setNickname(nick).catch(err => { })
    if (!result) return message.channel.send(`:x: Failed to change nickname. Check bot/user permissions and role hierarchy!\n${docs.action}/setnickname.`)

    result

    code = code.replaceLast(`$setNickname[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = setNickname;