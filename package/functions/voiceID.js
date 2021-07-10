const { docs } = require("../functions/docs/docs.json");

const voiceID = async (client, message, args, name, code, channel) => {

    const r = code.split("$voiceID").length - 1

    if (code.split("$voiceID")[r].startsWith("[")) {

        let inside = code.split("$voiceID[")[r].split("]")[0]

        let [userID, guildID] = inside.split(";");
        let err = client.suppress.get(message.idd)

        let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)
        if (!guild) return message.channel.send(`:x: Invalid guild ID in 2nd field of \`$voiceID[${inside}]\`.\n${docs.conditions}/voiceid`)


        let user = (userID ? userID : message.author.id)
        let member = await guild.members.fetch(user).catch(err => { })


        if (!member && err === undefined) return message.channel.send(`:x: Invalid user ID in \`$voiceID[${inside}]\`.\n${docs.data}/voiceid`)
        else if (!member && err !== undefined) return message.channel.send(err).catch(err => { })

        let m = "undefined"

        if (member.voice.channel) m = member.voice.channel.id

        code = code.replaceLast(`$voiceID[${inside}]`, m)

        return {
            code: code,
        }
    } else {

        let id = message.author.id
        let member = await message.guild.members.fetch(id)
        let final;
        if (member.voice.channel) {
            final = member.voice.channel.id
        } else {
            final = "undefined"
        }


        code = code.replaceLast("$voiceID", final)

        return {
            code: code
        }
    }
}
module.exports = voiceID;