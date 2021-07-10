const { docs } = require("../functions/docs/docs.json");

const returnEmoji = (client, message, args, name, code) => {
    let r = code.split("$returnEmoji[").length - 1

    let inside = code.split("$returnEmoji[")[r].split("]")[0]

    let [input, guildID] = inside.split(";");

    if (!input) return message.channel.send(`:x: \`$returnEmoji\` cannot be left empty. Provide emojiID or name.\n${docs.data}/returnemoji`)

    let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)
    if (!guild) return message.channel.send(`:x: Invalid guild ID in 2nd field of \`$returnemoji[${inside}]\`.\n${docs.data}/returnemoji`)

    let emoji = input;
    let emote = guild.emojis.cache.find(e => e.id === emoji || e.name === emoji)
    if (!emote) emote = undefined
    if (emote) {
        if (emote.animated) {
            let result;
            result = `<a:${emote.name}:${emote.id}>`
        } else {
            result = `<:${emote.name}:${emote.id}>`
        }
    }

    code = code.replaceLast(`$returnEmoji[${inside}]`, result)

    return {
        code: code
    }
}

module.exports = returnEmoji;