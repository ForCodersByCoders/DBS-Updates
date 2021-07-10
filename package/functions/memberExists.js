const { docs } = require("../functions/docs/docs.json");

const memberExists = async (client, message, args, name, code) => {

    let r = code.split("$memberExists[").length - 1

    let inside = code.split("$memberExists[")[r].split("]")[0]

    let [userID, guildID] = inside.split(";")


    let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)
    if (!guild) return message.channel.send(`:x: Invalid guild ID in 2nd field of \`$memberExists[${inside}]\`.\n${docs.conditions}/memberexists`)

    let user = (userID ? userID : message.author.id)
    let member = await guild.members.fetch(user).catch(e => { })

    code = code.replaceLast(`$memberExists[${inside}]`, member ? true : false)

    return {
        code: code
    }
}

module.exports = memberExists;