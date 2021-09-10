const voiceInfo = async (client, message, args, name, code) => {

    const r = code.split("$voiceInfo").length - 1

    let inside = code.split("$voiceInfo[")[r].split("]")[0]

    let [guildID, userID, option] = inside.split(";")
    option = option.toLowerCase()

    let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)
    if (!guild) return message.channel.send(`:x: Invalid guild ID in 1st field of \`$voiceInfo[${inside}]\`.\n${docs.conditions}/voiceinfo`)

    let user = (userID ? userID : message.author.id)
    let member = await guild.members.fetch(user).catch(err => { })

    if (!member || !member.voice) return message.channel.send(`:x: Invalid user ID in 2nd field of \`$voiceInfo[${inside}]\``)

    if (!option) return message.channel.send(`:x: Missing option in 3rd field of \`$voiceInfo[${inside}]\``)
    if (![
        "deaf",
        "mute",
        "stream",
        "speak"
    ].includes(option)) return message.channel.send(`:x: Invalid option in 3rd field of \`$voiceInfo[${inside}]\``)

    switch (option) {
        case "deaf": option = member.voice.deaf ? member.voice.deaf : 'false';
            break;
        case "mute": option = member.voice.mute ? member.voice.mute : 'false';
            break;
        case "stream": option = member.voice.streaming ? member.voice.streaming : 'false';
            break;
        case "speak": option = member.voice.speaking ? member.voice.speaking : 'false';
            break;

        default: undefined
    }


    code = code.replaceLast(`$voiceInfo[${inside}]`, option)

    return {
        code: code
    }
}
module.exports = voiceInfo;