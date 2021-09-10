const { docs } = require("../functions/docs/docs.json");

const nickname = async (client, message, args, name, code, channel) => {

    const r = code.split("$nickname").length - 1

    if (code.split("$nickname")[r].startsWith("[")) {

        let inside = code.split("$nickname[")[r].split("]")[0]
        let [userID, guildID] = inside.split(";");
        let err = client.suppress.get(message.idd)

        let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)
        if (!guild) return message.channel.send(`❌ Invalid guild ID in 2nd field of \`$nickname[${inside}]\`.\n${docs.data}/nickname`)

        let user = (userID ? userID : message.author.id)
        let member = await guild.members.fetch(user).catch(err => { })



        if (!member && (inside.split(";").length === 1) && err === undefined) {
            return message.channel.send(`❌ Invalid user ID in \`$nickname[${inside}]\`.\n${docs.data}/nickname`)
        } else if (!member && (inside.split(";").length === 2) && err === undefined) {
            return message.channel.send(`❌ Invalid user ID in 1st field of \`$nickname[${inside}]\`.\n${docs.data}/nickname`)
        }
        else if (!member && err !== undefined) return message.channel.send(err).catch(err => { })


        code = code.replaceLast(`$nickname[${inside}]`, member.displayName)


        return {
            code: code,
        }
    } else {

        code = code.replaceLast("$nickname", message.guild.members.cache.get(message.author.id).displayName)

        return {
            code: code
        }
    }
}
module.exports = nickname;