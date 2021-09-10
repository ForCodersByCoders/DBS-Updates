const { docs } = require("../functions/docs/docs.json");

const tempActivity = (client, message, args, name, code) => {

    let r = code.split("$tempActivity[").length - 1

    let inside = code.split("$tempActivity[")[r].split("]")[0]

    let pres = inside;

    client.user.setActivity(pres).catch(e => {
        return message.channel.send(`:x: Invalid activity status given in \`$tempActivity[${inside}]\`.\n${docs.action}/tempactivity`);
    })

    code = code.replaceLast(`$tempActivity[${inside}]`, "")
    return {
        code: code,
    }
}

module.exports = tempActivity;