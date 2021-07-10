const { docs } = require("../functions/docs/docs.json");

const isBot = async (client, message, args, name, code) => {

    const r = code.split("$isBot").length - 1

    if (code.split("$isBot")[r].startsWith("[")) {

        let inside = code.split("$isBot[")[r].split("]")[0]
        let id = (inside ? inside : message.author.id)
        let user = await client.users.fetch(id).catch(err => { })
        let err = client.suppress.get(message.idd)

        if (!user && err === undefined) return message.channel.send(`:x: Invalid user ID in \`$isBot[${inside}]\`.\n${docs.conditions}/isbot`)
        else if (!user && err !== undefined) return message.channel.send(err).catch(err => { })

        if (!user) user = { bot: false }

        code = code.replaceLast(`$isBot[${inside}]`, user.bot)

        return {
            code: code,
        }
    } else {

        code = code.replaceLast("$isBot", message.author.bot)

        return {
            code: code
        }
    }
}
module.exports = isBot;