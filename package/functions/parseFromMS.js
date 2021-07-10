const ms = require("humanize-duration");
const { docs } = require("../functions/docs/docs.json");

const parseFromMS = (client, message, args, name, code) => {
    let r = code.split("$parseFromMS[").length - 1
    let inside = code.split("$parseFromMS[")[r].split("]")[0]
    let time = inside
    let err = client.suppress.get(message.idd)

    if ((!time || isNaN(time)) && err === undefined) return message.channel.send(`:x: Invalid time provided in \`$parseFromMS[${inside}]\`.\n${docs.action}/parsefromms`);
    else if ((!time || isNaN(time)) && err !== undefined) return message.channel.send(err).catch(err => { });

    let result = ms(time)

    code = code.replace(`$parseFromMS[${inside}]`, result)

    return {
        code: code
    }
}
module.exports = parseFromMS;