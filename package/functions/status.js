const { docs } = require("../functions/docs/docs.json");

const status = async (client, message, args, name, code) => {

    const r = code.split("$status").length - 1

    if (code.split("$status")[r].startsWith("[")) {

        let inside = code.split("$status[")[r].split("]")[0]

        let err = client.suppress.get(message.idd)

        let user = (inside ? inside : message.author.id)
        let member = await client.users.fetch(user).catch(err => { })


        if (!member && err === undefined) return message.channel.send(`:x: Invalid user ID in \`$status[${inside}]\`.\n${docs.data}/status`)
        else if (!member & err !== undefined) return message.channel.send(err).catch(err => { })


        let platform = member.presence.clientStatus
        let status = member.presence.status

        if (status === "offline" && platform) status = "invisible"

        code = code.replaceLast(`$status[${inside}]`, status)

        return {
            code: code,
        }
    } else {

        let author = message.author
        let platform = author.presence.clientStatus
        let status = author.presence.status

        if (status === "offline" && platform) status = "invisible"

        code = code.replaceLast("$status", status)

        return {
            code: code
        }
    }
}
module.exports = status;