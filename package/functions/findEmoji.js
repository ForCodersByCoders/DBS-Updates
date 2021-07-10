const findEmoji = (client, message, args, name, code) => {
    let r = code.split("$findEmoji[").length - 1

    let inside = code.split("$findEmoji[")[r].split("]")[0]

    let [id, option] = inside.split(";");

    let emote = message.guild.emojis.cache.get(id) || message.guild.emojis.cache.find(emoji => emoji.name.toLowerCase() === id.trim().toLowerCase()) || 'undefined' || client.guilds.cache.find(g => g.emojis.cache.get(id)).emojis.cache.get(id)

    if (!inside) emote = undefined

    if (option === "name") {
        code = code.replaceLast(`$findEmoji[${inside}]`, emote.name)
    }
    else if (option === "emoji") {
        code = code.replaceLast(`$findEmoji[${inside}]`, emote.toString())
    }

    else code = code.replaceLast(`$findEmoji[${inside}]`, emote)

    return {
        code: code
    }
}
module.exports = findEmoji;