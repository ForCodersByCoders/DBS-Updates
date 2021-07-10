const {docs} = require("../functions/docs/docs.json");

const lastMessageURL = async (client, message, args, name, code) => {

    const r = code.split("$lastMessageURL").length - 1

    if (code.split("$lastMessageURL")[r].startsWith("[")) {

        let inside = code.split("$lastMessageURL[")[r].split("]")[0]
        let id = (inside ? inside : message.author.id)
        let user = await client.users.fetch(id).catch(err => {})
        let err = client.suppress.get(message.idd)

        if (!user && message.channel && err === undefined) return message.channel.send(`❌ Invalid user ID in \`$lastMessageURL[${inside}]\`.\n${docs.data}/lastmessageurl`)
        else if (!user && message.channel && err !== undefined) return message.channel.send(err).catch(err => {})

let result;
        try {
            result = user.lastMessage.url
        } catch {
            if(result === undefined) result = undefined
            else result = (user.lastMessage.url || id.lastMessage.url)
        }
      
        if(result === null) result = undefined
        code = code.replaceLast(`$lastMessageURL[${inside}]`, result)


        return {
            code: code,
        }
    } else {

        let id = message.author

        code = code.replaceLast("$lastMessageURL", id.lastMessage.url)
        
        return {
            code: code
        }
    }
}
module.exports = lastMessageURL;