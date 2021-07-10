const moment = require("moment")
const { docs } = require("../functions/docs/docs.json");

const creationDate = async (client, message, args, name, code) => {

    let r = code.split("$creationDate[").length - 1

    let inside = code.split("$creationDate[")[r].split("]")[0]

    let opt = inside.split(";")[1] || "user"

    let id = inside.split(";")[0]

    let option = message.guild.roles.cache.get(id) || client.users.cache.get(id) || message.guild.channels.cache.get(id) || client.guilds.cache.get(id)

    let err = client.suppress.get(message.idd)

    if (!option && err === undefined) return message.channel.send(`:x: Invalid ID in \`$creationDate[${inside}]\`.\n${docs.data}/creationdate`)
    else if (!option && err !== undefined) return message.channel.send(err).catch(err => { })

    if (client.users.cache.get(id) && message.guild.members.cache.get(id)) {
        if (opt === "member") {
            let member = message.guild.members.cache.get(id)
            option = member.joinedAt
        }
    }

    if (opt !== "member") option = option.createdAt

    code = code.replaceLast(`$creationDate[${inside}]`, moment(option).format("LLLL"))

    return {
        code: code
    }
}

module.exports = creationDate