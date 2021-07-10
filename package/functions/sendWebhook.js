const Discord = require("discord.js")
const f = require('../../package/embed.js')
const { docs } = require("../functions/docs/docs.json");

const sendWebhook = (client, message, args, name, code) => {

    let r = code.split("$sendWebhook[").length - 1

    let inside = code.split("$sendWebhook[")[r].split(/]$/gm)[0]

    let fields = inside.split(";")

    if (!fields[0]) return message.channel.send(`:x: Invalid Webhook URL given in 1st field of \`$sendWebhook[URL;message]\`\n${docs.action}/sendwebhook`)

    let url = fields[0]
    let split = url.split("/")
    let id = split[5]
    let token = split[6]
    let web = new Discord.WebhookClient(id, token)

    if (!fields[1]) return message.channel.send(`:x: Invalid message to send in 2nd field of \`$sendWebhook[URL;message]\`\n${docs.action}/sendwebhook`)

    let msg = fields[1]

    if (msg.includes("{hyper:")) {
        msg.split("{hyper:").map(x => {
            if (!msg.includes("{hyper:")) return
            let ins = msg.split("{hyper:")[1].split("}")[0]
            let text = ins.split(":")[0]
            let url = ins.split(":").slice(1).join(":")
            msg = msg.replace(`{hyper:${ins}}`, `[${text}](${url})`)
        })
    }

    let m = f(msg)

    try {
        web.send(m.error, m.embed).catch(e => {
            message.channel.send(e.message)
        })
    } catch {
        return message.channel.send(`:x: Failed to send webhook message.\n${docs.action}/sendwebhook`)
    }


    code = code.replaceLast(`$sendWebhook[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = sendWebhook