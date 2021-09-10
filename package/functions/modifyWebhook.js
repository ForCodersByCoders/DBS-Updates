const {docs} = require("../functions/docs/docs.json");

const modifyWebhook = async (client, message, args, name, code) => {
    
    const r = code.split("$modifyWebhook[").length - 1 
    
    const inside = code.split("$modifyWebhook[")[r].split("]")[0] 
    
    const [URL, NAME, avatar] = inside.split(";") 

    if (!URL) return message.channel.send(`:x: Invalid Webhook URL given in 1st field of \`$modifyWebhook[URL;option]\`.\n${docs.action}/modifywebhook`)

    let url = URL

    let split = url.split("/")
    
    let id = split[5]
    
    let token = split[6]
    
    const hook = await client.fetchWebhook(id, token).catch(err => null)
    
    if (!hook) return message.channel.send(`❌ Invalid webhook URL given in 1st field of \`$modifyWebhook[URL;option]\``) 
    
    const w = await hook.edit({
        name: NAME, 
        avatar
    }).catch(err => null)
    
    if (!w) return message.channel.send(`❌ Failed to modify webhook! Check bot/user permissions!\n${docs.action}/modifywebhook`) 
    
    code = code.replaceLast(`$modifyWebhook[${inside}]`, "")

    return {
        code: code
    }
}
module.exports = modifyWebhook