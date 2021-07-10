const {docs} = require("../functions/docs/docs.json");

const mentionedRoles = (client, message, args, name, code) => {

    let r = code.split("$mentionedRoles[").length - 1

    let inside = code.split("$mentionedRoles[")[r].split("]")[0]

    let [number] = inside.split(";")

    if (isNaN(number) || Number(number) < 1) return message.channel.send(`:x: Invalid mention number in \`$mentionedRoles[${inside}]\`.\n${docs.data}/mentionedroles`)

   let m = "";
if (message.mentions.roles.array()[number - 1]) {
m = message.mentions.roles.array()[number - 1].id;
}
    code = code.replaceLast(`$mentionedRoles[${inside}]`, m)

    return {
        code: code
    }
}

module.exports = mentionedRoles;