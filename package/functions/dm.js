const { docs } = require("../functions/docs/docs.json");

const dm = async (client, message, args, name, code) => {

    if (code.split("$dm").length >= 3) return message.channel.send(`:x: Cant use more than one \`$dm\`.\n${docs.action}/dm`)

    const r = code.split("$dm").length - 1

    if (code.split("$dm")[r].startsWith("[")) {

        let inside = code.split("$dm[")[r].split("]")[0]

        // let user = client.users.cache.get(inside)

        let user = await client.users.fetch(inside).catch(err => { })

        let err = client.suppress.get(message.idd)

        if (!user && message.channel && err === undefined) return message.channel.send(`:x: Invalid user ID in \`$dm[${inside}]\`.\n${docs.action}/dm`)
        else if (!user && message.channel && err !== undefined) return message.channel.send(err).catch(err => { })

        if (!user) return console.error(`Invalid user ID in $dm[${inside}].\n${docs.action}/dm`)

        code = code.replaceLast(`$dm[${inside}]`, "")

        client.channel.set(message.idd, user)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$dm", "")

        client.channel.set(message.idd, message.author)

        return {
            code: code
        }
    }
}

module.exports = dm;