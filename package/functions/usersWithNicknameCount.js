const { docs } = require("discordbot-script/package/functions/docs/docs");

const usersWithNicknameCount = async (client, message, args, name, code) => {

    let r = code.split("$usersWithNicknameCount[").length - 1

    let inside = code.split("$usersWithNicknameCount[")[r].split("]")[0]

    let [nickname, guildID] = inside.split(";")

    let id = (guildID ? guildID : message.guild.id)
    let guild = client.guilds.cache.get(id)
    if (!guild) return message.channel.send(`:x: Invalid guild ID in 2nd field of \`$usersWithNicknameCount[${inside}]\`.\n${docs.action}/userswithnicknamecount`)


    let err = client.suppress.get(message.idd)

    if ((!nickname) && err === undefined) return message.channel.send(`:x: Nickname is not given in \`$usersWithNicknameCount\`\n${docs.data}/userswithnicknamecount`);


    let nick = await guild.members.cache.filter(x => x.displayName.toLowerCase() === nickname.toLowerCase())

    if (!nick && err === undefined) return message.channel.send(`:x: No nicknames found in \`$usersWithNicknameCount[${inside}]\`.\n${docs.data}/userswithnicknamecount`)

    let users = []

    nick.forEach(x => { users.push(x.user.tag) })

    code = code.replaceLast(`$usersWithNicknameCount[${inside}]`, users.length)

    return {
        code: code
    }
}

module.exports = usersWithNicknameCount;