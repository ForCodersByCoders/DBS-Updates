const {docs} = require("../functions/docs/docs.json");

const deleteWebhook = async (client, message, args, name, code) => {

    let r = code.split("$deleteWebhook[").length - 1
    let inside = code.split("$deleteWebhook[")[r].split("]")[0]
  
    const fields = inside.split(";")

    if (!fields[0]) return message.channel.send(`:x: Invalid Webhook URL given in 1st field of \`$deleteWebhook[URL;message]\`.\n${docs.action}/deletewebhook`)

    let url = fields[0]

    let split = url.split("/")
    
    let id = split[5]
    
    let token = split[6]


    const webhook = await client.fetchWebhook(id, token).catch(err => null)
    
    if (!webhook) return message.channel.send(`❌ Invalid webhookURL in \`$deleteWebhook[${inside}]\`.\n${docs.action}/deletewebhook`) 
    
    const webdel = await webhook.delete().catch(err => null) 
    
    if (!webdel) return message.channel.send(`❌ Failed to delete webhook. Check bot/user permissions.\n${docs.action}/deletwebhook.`) 
    
    code = code.replaceLast(`$deleteWebhook[${inside}]`, "")

    return {
        code: code
    }
}
module.exports = deleteWebhook;