const moment = require("moment")
const { docs } = require("../functions/docs/docs.json");

const webhook = async (client, message, args, name, code) => {

    let r = code.split("$webhook[").length - 1

    let inside = code.split("$webhook[")[r].split("]")[0]

    const fields = inside.split(";")

    if (!fields[0]) return message.channel.send(`:x: Invalid Webhook URL given in 1st field of \`$webhook[URL;option]\`.\n${docs.compacts}/webhook`)

    let url = fields[0]

    let split = url.split("/")

    let id = split[5]

    let token = split[6]

    const hook = await client.fetchWebhook(id, token).catch(err => null)

    let opt = fields[1].toLowerCase()

    if (!hook && (opt != "exists")) return message.channel.send(`❌ Invalid webhookURL in 1st field of \`$webhook[URL;option]\`.\n${docs.compacts}/webhook`)

    if (!opt) return message.channel.send(`:x: Missing option in 2nd field of \`$webhook[URL;option]\`.\n${docs.compacts}/webhook`)
    if (![
        "avatar",
        "channelid",
        "created",
        "id",
        "server",
        "name",
        "token",
        "type",
        "url",
        "exists"
    ].includes(opt)) return message.channel.send(`:x: Invalid option in 2nd field of \`$webhook[URL;option]\`.\n${docs.compacts}/webhook`)


    if (opt === "avatar") opt = `https://cdn.discordapp.com/avatars/${hook.id}/${hook.avatar}.png` || undefined
    else if (opt === "channelid") opt = hook.channelID || undefined
    else if (opt === "created") opt = moment(hook.createdAt).format("LLLL")
    else if (opt === "id") opt = hook.id || undefined
    else if (opt === "name") opt = hook.name || undefined
    else if (opt === "token") opt = hook.token || undefined
    else if (opt === "type") opt = hook.type || undefined
    else if (opt === "url") opt = hook.url || undefined
    else if (opt === "server") opt = hook.guildID || undefined
    else if (opt === "exists") opt = hook ? true : false


    code = code.replaceLast(`$webhook[${inside}]`, opt)

    return {
        code: code
    }
}

module.exports = webhook