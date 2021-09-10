const { docs } = require("../functions/docs/docs.json");

const positionInCategory = async (client, message, args, name, code) => {

    const r = code.split("$positionInCategory").length - 1

    if (code.split("$positionInCategory")[r].startsWith("[")) {

        let inside = code.split("$positionInCategory[")[r].split("]")[0]

        let channel = await client.channels.fetch(inside ? inside : message.channel.id).catch(err => { })
        if (!channel) return message.channel.send(`:x: Invalid channel ID in \`$positionInCategory[${inside}]\`.\n${docs.data}/positionincategory`)

        let type = channel.type
        if (channel && (type == "category")) return message.channel.send(`:x: Invalid channel type. Must **not** be an ID of a category.\n${docs.data}/positionincategory`)


        code = code.replaceLast(`$positionInCategory[${inside}]`, channel.position + 1)

        return {
            code: code,
        }
    } else {

        code = code.replaceLast("$positionInCategory", message.channel.position + 1)

        return {
            code: code
        }
    }
}
module.exports = positionInCategory;