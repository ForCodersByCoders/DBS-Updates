const { docs } = require("../functions/docs/docs.json");

const isBoosting = async (client, message, args, name, code, channel) => {

    const r = code.split("$isBoosting").length - 1

    if (code.split("$isBoosting")[r].startsWith("[")) {

        let inside = code.split("$isBoosting[")[r].split("]")[0]
        let [userID, guildID] = inside.split(";");

        let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)

        if (!guild) return message.channel.send(`:x: Invalid guild ID in 2nd field of \`$isBoosting[${inside}]\`.\n${docs.conditions}/isboosting`)


        let id = (userID ? userID : message.author.id)
        let member = await guild.members.fetch(id).catch(err => { })

        if (!member && (inside.split(";").length === 1)) return message.channel.send(`:x: User not in guild! \`$isBoosting[${inside}]\`.\n${docs.conditions}/isboosting\n**Catch with \`$memberExists\`**.`)
        if (!member && (inside.split(";").length === 2)) return message.channel.send(`:x: User not in guild! \`$isBoosting[${inside}]\`.\n${docs.conditions}/isboosting\n**Catch with \`$memberExists\`**.`)


        let statement;
        if (member.premiumSinceTimestamp === null || member.premiumSinceTimestamp === undefined) statement = "false"
        else
            statement = "true"

        code = code.replaceLast(`$isBoosting[${inside}]`, statement)

        return {
            code: code,
        }
    } else {

        let statement;
        if (message.author.id.premiumSinceTimestamp === null || message.author.id.premiumSinceTimestamp === undefined) statement = "false"
        else
            statement = "true"

        code = code.replaceLast("$isBoosting", statement)

        return {
            code: code
        }
    }
}
module.exports = isBoosting;