const { docs } = require("discordbot-script/package/functions/docs/docs");

const usersWithNickname = async (client, message, args, name, code) => {

    let r = code.split("$usersWithNickname[").length - 1

    let inside = code.split("$usersWithNickname[")[r].split("]")[0]

    let [nickname, guildID] = inside.split(";")

    let id = (guildID ? guildID : message.guild.id)
    let guild = client.guilds.cache.get(id)
    if (!guild) return message.channel.send(`:x: Invalid guild ID in 2nd field of \`$usersWithNickname[${inside}]\`.\n${docs.action}/userswithnickname`)

    let err = client.suppress.get(message.idd)

    if ((!nickname) && err === undefined) return message.channel.send(`:x: Nickname is not given in \`$usersWithNickname\`\n${docs.data}/userswithnickname`);


    let nick = await guild.members.cache.filter(x => x.displayName.toLowerCase() === nickname.toLowerCase())

    if (!nick) return message.channel.send(`:x: No nicknames found in \`$usersWithNickname[${inside}]\`.\n${docs.data}/userswithnickname`)

    let users = []

    nick.forEach(x => { users.push(x.user.tag) })

    code = code.replaceLast(`$usersWithNickname[${inside}]`, users.join("\n") || "None")

    return {
        code: code
    }
}

module.exports = usersWithNickname;