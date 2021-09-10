const { docs } = require("../functions/docs/docs.json");

const vcMove = async (client, message, args, name, code) => {

    let r = code.split("$vcMove[").length - 1

    let inside = code.split("$vcMove[")[r].split("]")[0]

    let [guildID, userID, channelID] = inside.split(";")

    let gid = (guildID ? guildID : message.guild.id)
    let guild = client.guilds.cache.get(gid)
    if (!guild) return message.channel.send(`:x: Invalid guild ID in 1st field of \`$vcMove[${inside}]\`.\n${docs.action}/vcmove`)

    let uid = (userID ? userID : message.author.id)
    let user = await guild.members.fetch(uid).catch(err => { })
    if (!user) return message.channel.send(`:x: Invalid user ID in 2nd field of \`$vcMove[${inside}]\`.\n${docs.action}/vcmove`)

    let cid = (channelID ? channelID : message.channel.id)
    let channel = await guild.channels.cache.get(cid)

    if (!channel) return message.channel.send(`:x: Invalid channel ID in 3rd field of \`$vcMove[${inside}]\`.\n${docs.action}/vcmove`)
    if (!user.voice.channelID) return message.channel.send(`:x: ${user.user.tag} is not connected to a voice channel!\n${docs.action}/vcmove`)
    if (channel.type != 'voice') return message.channel.send(`:x: ${channel.toString()} is not a voice channel!\n${docs.action}/vcmove`)
    if (user.voice.channelID === channel.id) return message.channel.send(`:x: ${user.user.tag} is already connected to <#${user.voice.channelID}>!\n${docs.action}/vcmove`)


    await user.voice.setChannel(channel)

    code = code.replaceLast(`$vcMove[${inside}]`, '')

    return {
        code: code
    }
}

module.exports = vcMove;