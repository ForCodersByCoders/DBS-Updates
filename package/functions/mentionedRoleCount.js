const mentionedRoleCount = (client, message, args, name, code) => {

    let r = code.split("$mentionedRoleCount[").length - 1

    let inside = code.split("$mentionedRoleCount[")[r].split("]")[0]

    if (message.mentions.roles.array()) {
    amount = message.mentions.roles.array().length;
    }

    code = code.replaceLast(`$mentionedRoleCount[${inside}]`, amount)

    return {
        code: code
    }
}
module.exports = mentionedRoleCount;