const { docs } = require("../functions/docs/docs.json");
const f = require('../../package/embed.js')

const dm = async (client, message, args, name, code) => {

    if (code.split("$dm").length >= 3) return message.channel.send(`:x: Cant use more than one \`$dm\`.\n${docs.action}/dm`)

    const r = code.split("$dm").length - 1

    if (code.split("$dm")[r].startsWith("[")) {

        let inside = code.split("$dm[")[r].split("]")[0]

        let [userID, msg] = inside.split(';')
        let m = f(msg)

        let user = await client.users.fetch(userID).catch(err => { })

        let err = client.suppress.get(message.idd)

        if (!user && message.channel && err === undefined) return message.channel.send(`:x: Invalid user ID in 1st field of \`$dm[${inside}]\`.\n${docs.action}/dm`)
        else if (!user && message.channel && err !== undefined) return message.channel.send(err).catch(err => { })

        if (!msg) return message.channel.send(`:x: Missing message in 2nd field of \`$dm[${inside}]\` to send to ${user.tag}.\n${docs.action}/dm`)

        await user.send(m.error, m.embed)

        code = code.replaceLast(`$dm[${inside}]`, "")

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