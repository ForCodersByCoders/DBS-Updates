const {docs} = require("../functions/docs/docs.json");

const lastMessageID = async (client, message, args, name, code) => {

    const r = code.split("$lastMessageID").length - 1

    if (code.split("$lastMessageID")[r].startsWith("[")) {

        let inside = code.split("$lastMessageID[")[r].split("]")[0]
        let id = (inside ? inside : message.author.id)
        let member = await client.users.fetch(id).catch(err => {})
        let err = client.suppress.get(message.idd)

        if (!member && message.channel && err === undefined) return message.channel.send(`❌ Invalid user ID in \`$lastMessageID[${inside}]\`.\n${docs.data}/lastmessageid`)
        else if (!member && message.channel && err !== undefined) return message.channel.send(err).catch(err => {})
let result = member.lastMessageID
      
        if(result === null) result = undefined
        code = code.replaceLast(`$lastMessageID[${inside}]`, result)


        return {
            code: code,
        }
    } else {

        let id = message.author

        code = code.replaceLast("$lastMessageID", id.lastMessageID)
        
        return {
            code: code
        }
    }
}
module.exports = lastMessageID;