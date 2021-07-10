const mentionedUserCount = (client, message, args, name, code) => {

    let r = code.split("$mentionedUserCount[").length - 1

    let inside = code.split("$mentionedUserCount[")[r].split("]")[0]

    if (message.mentions.users.array()) {
    amount = message.mentions.users.array().length;
    }

    code = code.replaceLast(`$mentionedUserCount[${inside}]`, amount)

    return {
        code: code
    }
}
module.exports = mentionedUserCount;