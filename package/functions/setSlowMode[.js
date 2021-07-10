const { docs } = require("../functions/docs/docs.json");

const setSlowMode = async (client, message, args, name, code) => {

    let r = code.split("$setSlowMode[").length - 1

    let inside = code.split("$setSlowMode[")[r].split("]")[0]

    let [channelID, time] = inside.split(";")

    if (!time) time = "0"

    if (!channelID) return message.channel.send(`:x: Channel ID is not provided in in 1st field of \`$setSlowMode[${inside}]\`\n${docs.action}/setslowmode`);
    if (!time) return message.channel.send(`:x: Slow mode time is not provided in 2nd field of \`$setSlowMode[${inside}]\`.\n${docs.action}/setslowmode`);

    let channel = await client.channels.fetch(channelID);

    let err = client.suppress.get(message.idd)

    if (!channel && err === undefined) return message.channel.send(`:x: Unable to find the channel in 1st field of \`$setSlowMode[${inside}]\`.\n${docs.action}/setslowmode`)

    let process;
    try {
        process = await channel.setRateLimitPerUser(Number(time))
    } catch {
        if (err === undefined) return message.channel.send(`:x: Something went wrong while executing command with \`$setSlowMode[${inside}]\`.\n${docs.action}/setslowmode`)
    }
    code = code.replaceLast(`$setSlowMode[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = setSlowMode;