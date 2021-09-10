const { docs } = require("discordbot-script/package/functions/docs/docs");

const guildVerificationLvl = async (client, message, args, name, code, channel) => {

    const r = code.split("$guildVerificationLvl").length - 1

    if (code.split("$guildVerificationLvl")[r].startsWith("[")) {

        let inside = code.split("$guildVerificationLvl[")[r].split("]")[0]
        let id = (inside ? inside : message.guild.id)
        let guild = client.guilds.cache.get(id)

        let err = client.suppress.get(message.idd)

        if (!guild && message.channel && err === undefined) return message.channel.send(`:x: Invalid guild ID in \`$guildVerificationLvl[${inside}]\`.\n${docs.data}/guildverificationlvl`)
        else if (!guild && message.channel && err !== undefined) return message.channel.send(err).catch(err => { })

        code = code.replaceLast(`$guildVerificationLvl[${inside}]`, guild.verificationLevel)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$guildVerificationLvl", message.guild.verificationLevel)

        return {
            code: code
        }
    }
}
module.exports = guildVerificationLvl;