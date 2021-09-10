const mentionedChannelCount = (client, message, args, name, code) => {

    let r = code.split("$mentionedChannelCount[").length - 1

    let inside = code.split("$mentionedChannelCount[")[r].split("]")[0]

    if (message.mentions.channels.array()) {
    amount = message.mentions.channels.array().length;
    }

    code = code.replaceLast(`$mentionedChannelCount[${inside}]`, amount)

    return {
        code: code
    }
}
module.exports = mentionedChannelCount;