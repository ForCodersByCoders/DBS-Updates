const {docs} = require("../functions/docs/docs.json");

const lastMessageChannelID = async (client, message, args, name, code) => {

    const r = code.split("$lastMessageChannelID").length - 1

    if (code.split("$lastMessageChannelID")[r].startsWith("[")) {

        let inside = code.split("$lastMessageChannelID[")[r].split("]")[0]
        let id = (inside ? inside : message.author.id)
        let member = await client.users.fetch(id).catch(err => {})
        let err = client.suppress.get(message.idd)

        if (!member && message.channel && err === undefined) return message.channel.send(`❌ Invalid user ID in \`$lastMessageChannelID[${inside}]\`.\n${docs.data}/lastmessagechannelid`)
        else if (!member && message.channel && err !== undefined) return message.channel.send(err).catch(err => {})
let result = member.lastMessageChannelID
      
        if(result === null) result = undefined
        code = code.replaceLast(`$lastMessageChannelID[${inside}]`, result)


        return {
            code: code,
        }
    } else {

        let id = message.author

        code = code.replaceLast("$lastMessageChannelID", id.lastMessageChannelID)
        
        return {
            code: code
        }
    }
}
module.exports = lastMessageChannelID;