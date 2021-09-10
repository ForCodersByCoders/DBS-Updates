const { docs } = require("../functions/docs/docs.json");

const setEmojiName = async (client, message, args, name, code) => {
    let r = code.split("$setEmojiName[").length - 1

    let inside = code.split("$setEmojiName[")[r].split("]")[0]

    let [guildID, emojiID, Name] = inside.split(";")


    let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)
    if (!guild) return message.channel.send(`:x: Invalid guild ID in 1st field of $setEmojiName[${inside}].\n${docs.action}/setemojiname`)


    try {
        emoji = await guild.emojis.cache.get(emojiID)
    } catch {
        return message.channel.send(`:x: Invalid emoji ID in 2nd field of $setEmojiName[${inside}].\n${docs.action}/setemojiname`)
    }
    if (!emoji) return message.channel.send(`:x: Invalid emoji ID in 2nd field of $setEmojiName[${inside}].\n${docs.action}/setemojiname`)
    if (!Name) return message.channel.send(`:x: Missing emoji name in 2nd field of $setEmojiName[${inside}].\n${docs.action}/setemojiname`)
    // else message.channel.send(`:x: Failed to set emoji name in $setEmojiName[${inside}]`)


    let result = await emoji.setName(Name).catch(err => { })
    if (!result) return message.channel.send(`:x: Failed to set emoji name in \`$setEmojiName[${inside}]\`.\n${docs.action}/setemojiname.`)

    result

    code = code.replaceLast(`$setEmojiName[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = setEmojiName;