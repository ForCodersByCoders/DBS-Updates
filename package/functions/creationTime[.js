const ms = require('parse-ms')
const { docs } = require("../functions/docs/docs.json");

const creationTime = async (client, message, args, name, code) => {

    let r = code.split("$creationTime[").length - 1

    let inside = code.split("$creationTime[")[r].split("]")[0]

    let opt = inside.split(";")[1] || "user"

    let id = inside.split(";")[0]

    let option = message.guild.roles.cache.get(id) || client.users.cache.get(id) || message.guild.channels.cache.get(id) || client.guilds.cache.get(id)

    let err = client.suppress.get(message.idd)

    if (!option && err === undefined) return message.channel.send(`:x: Invalid ID in \`$creationTime[${inside}]\`.\n${docs.data}/creationtime`)
    else if (!option && err !== undefined) return message.channel.send(err).catch(err => { })

    if (client.users.cache.get(id) && message.guild.members.cache.get(id)) {
        if (opt === "member") {
            let member = message.guild.members.cache.get(id)
            option = member.joinedTimestamp
        }
    }

    if (opt !== "member") option = option.createdTimestamp

    option = Date.now() - option
    code = code.replaceLast(`$creationTime[${inside}]`, Object.entries(ms(option)).map((x, y) => {
        if (x[1] > 0 && y < 4) return `${x[1]} ${x[0]}`
        else return ""
    }).filter(x => x).join(", "))

    return {
        code: code
    }
}

module.exports = creationTime