const { docs } = require("../functions/docs/docs.json");

const tag = async (client, message, args, name, code, channel) => {

    const r = code.split("$tag").length - 1

    if (code.split("$tag")[r].startsWith("[")) {

        let inside = code.split("$tag[")[r].split("]")[0]
        let id = (inside ? inside : message.author.id)
        let user = await client.users.fetch(id).catch(err => { })

        let err = client.suppress.get(message.idd)

        if (!user && message.channel && err === undefined) return message.channel.send(`:x: Invalid user ID in \`$tag[${inside}]\`.\n${docs.data}/tag`)
        else if (!user && message.channel && err !== undefined) return message.channel.send(err).catch(err => { })

        code = code.replaceLast(`$tag[${inside}]`, user.tag)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$tag", message.author.tag)

        return {
            code: code
        }
    }
}
module.exports = tag;