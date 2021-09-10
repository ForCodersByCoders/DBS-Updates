const emojiToID = (client, message, args, name, code) => {
    let r = code.split("$emojiToID[").length - 1

    let inside = code.split("$emojiToID[")[r].split("]")[0]
    let emote;

    if (!inside) emote = undefined

    try {
        emote = client.emojis.cache.find(e => e.toString() == `${inside}`).id
        if (emote === undefined) emote = undefined

    } catch {
        emote = undefined
    }

    code = code.replaceLast(`$emojiToID[${inside}]`, emote)

    return {
        code: code
    }
}

module.exports = emojiToID;