const { docs } = require("../functions/docs/docs.json");

const modifyEmoji = async (client, message, args, name, code) => {
    let r = code.split("$modifyEmoji[").length - 1

    let inside = code.split("$modifyEmoji[")[r].split("]")[0]

    let [guildID, emojiID, Name, ...roleIDs] = inside.split(";")


    let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)
    if (!guild) return message.channel.send(`:x: Invalid guild ID in 1st field of $modifyEmoji[${inside}].\n${docs.action}/modifyemoji`)

    let emote;
    try {
        emote = await guild.emojis.cache.get(emojiID)
    } catch {
        return message.channel.send(`:x: Invalid emoji ID in 2nd field of $modifyEmoji[${inside}].\n${docs.action}/modifyemoji`)
    }

    if (!Name) return message.channel.send(`:x: Missing new emoji name in 2nd field of $modifyEmoji[${inside}]\n${docs.action}/modifyemoji`)

    let ROLES;
    try {
        ROLES = guild.roles.fetch(roleIDs).catch(err => { })
        if (!ROLES) return message.channel.send(`:x: Invalid role ID in $modifyEmoji[${inside}]\n${docs.action}/modifyemoji`)
    } catch {
        // return message.channel.send(`:x: Invalid role ID in $modifyEmoji[${inside}]\n${docs.action}/modifyemoji`)
    }

    const e = emote.edit({
        name: Name,
        roles: ROLES
    }).catch(err => null)

    if (!e) return message.channel.send(`❌ Failed to modify emoji! Check bot/user permissions!\n${docs.action}/modifyemoji`)

    code = code.replaceLast(`$modifyEmoji[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = modifyEmoji;