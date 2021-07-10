const { docs } = require("../functions/docs/docs.json");

const setStatus = (client, message, args, name, code) => {

    let r = code.split("$setStatus[").length - 1

    let inside = code.split("$setStatus[")[r].split("]")[0]
    let stat = inside;
    let pres = inside;

    if (pres !== "dnd" && pres !== "idle" && pres !== "invisible" && pres !== "online")
        return message.channel.send(`:x: Invalid status given in \`$setStatus[${inside}]\`\n${docs.action}/setstatus`);

    client.user.setStatus(stat).catch(e => {
        return message.channel.send(`:x: Invalid status given in \`$setStatus[${inside}]\`\n${docs.action}/setstatus`);
    })

    code = code.replaceLast(`$setStatus[${inside}]`, "")
    return {
        code: code,
    }
}

module.exports = setStatus