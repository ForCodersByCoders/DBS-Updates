const { docs } = require("../functions/docs/docs.json");

const isUserInGuild = async (client, message, args, name, code) => {

    let r = code.split("$isUserInGuild[").length - 1

    let inside = code.split("$isUserInGuild[")[r].split("]")[0]

    let [guildID, userID] = inside.split(";");

    let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)

    if (!guild) return message.channel.send(`:x: Invalid guild ID in 1st field of \`$isUserInGuild[${inside}]\`.\n${docs.data}/isuseringuild`)


    let user = client.users.fetch(userID ? userID : message.author.id)
    if (!user) return message.channel.send(`:x: Invalid user ID in 2nd field of $isUserInGuild[\`${inside}]\`.\n${docs.data}/isuseringuild`)

    let check;

    let final;
    try {
        final = await guild.members.fetch(userID)
    } catch {
        check = false
    }

    if (check !== false) check = true


    code = code.replaceLast(`$isUserInGuild[${inside}]`, check)

    return {
        code: code
    }
}

module.exports = isUserInGuild;