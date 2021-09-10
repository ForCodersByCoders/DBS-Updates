const { docs } = require("../functions/docs/docs.json");

const vcKick = async (client, message, args, name, code) => {

    let r = code.split("$vcKick[").length - 1

    let inside = code.split("$vcKick[")[r].split("]")[0]

    let [guildID, userID] = inside.split(";")

    let gid = (guildID ? guildID : message.guild.id)
    let guild = client.guilds.cache.get(gid)
    if (!guild) return message.channel.send(`:x: Invalid guild ID in 1st field of \`$vcKick[${inside}]\`.\n${docs.action}/vckick`)

    let uid = (userID ? userID : message.author.id)
    let user = await guild.members.fetch(uid).catch(err => { })
    if (!user) return message.channel.send(`:x: Invalid user ID in 2nd field of \`$vcKick[${inside}]\`.\n${docs.action}/vckick`)

    if (!user.voice.channelID) return message.channel.send(`:x: ${user.user.tag} is not connected to a voice channel!\n${docs.action}/vckick`)


    await user.voice.kick()

    code = code.replaceLast(`$vcKick[${inside}]`, '')

    return {
        code: code
    }
}

module.exports = vcKick;