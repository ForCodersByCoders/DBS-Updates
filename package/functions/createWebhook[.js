const { docs } = require("../functions/docs/docs.json");

const createWebhook = async (client, message, args, name, code) => {

    let r = code.split("$createWebhook[").length - 1

    let inside = code.split("$createWebhook[")[r].split("]")[0]

    let fields = inside.split(";")


    if (!fields[0]) return message.channel.send(`:x: Missing channel ID in 1st field of \`$createWebhook[${inside}]\`.\n${docs.action}/createwebhook`)

    let channel = await client.channels.fetch(fields[0]).catch(err => { })
    if (channel) return message.channel.send(`:x: Invalid channel ID in 1st field of \`$createWebhook[${inside}].\n${docs.action}/createwebhook`)

    if (!fields[1]) return message.channel.send(`:x: Missing Webhook name in 2nd field of \`$createWebhook[${inside}]\`.\n${docs.action}/createwebhook`)

    let wname = fields[1]

    if (!fields[2]) return message.channel.send(`:x: Invalid Webhook avatar URL in 3rd field of \`$createWebhook[${inside}]\`.\n${docs.action}/createwebhook`)

    if (!fields[2].startsWith("https://") || !fields[2].includes(".")) return message.channel.send(`:x: Invalid Webhook avatar URL in 3rd field of \`$createWebhook[${inside}]\`.\n${docs.action}/createwebhook`)

    let wavatar = fields[2]



    let w;
    try {
        w = await channel.createWebhook(wname, { avatar: wavatar })
    } catch {
        return message.channel.send(":x: Failed to create Webhook.")
    }

    let url = w.url


    code = code.replaceLast(`$createWebhook[${inside}]`, url)

    return {
        code: code
    }
}

module.exports = createWebhook