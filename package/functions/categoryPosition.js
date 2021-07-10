const { docs } = require("../functions/docs/docs.json");

const categoryPosition = async (client, message, args, name, code) => {

    let r = code.split("$categoryPosition[").length - 1

    let inside = code.split("$categoryPosition[")[r].split("]")[0]

    let channel = await client.channels.fetch(inside).catch(err => { })
    if (!channel) return message.channel.send(`:x: Invalid category ID in \`$categoryPosition[${inside}]\`.\n${docs.data}/categoryposition`)

    if (channel.type !== "category") return message.channel.send(`:x: Must be an ID of a channel category in \`$categoryPosition[${inside}]\`!\n${docs.data}/categoryposition`)

    code = code.replaceLast(`$categoryPosition[${inside}]`, channel.rawPosition)

    return {
        code: code
    }
}

module.exports = categoryPosition