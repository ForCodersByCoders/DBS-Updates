const {docs} = require("../functions/docs/docs.json");

const addCmdReactions = async (client, message, args, name, code) => {

    if (code.split("$addCmdReactions[").length >= 3) return message.channel.send(`:x: Cant use more than one \`$addCmdReactions\`.\n${docs.action}/addcmdreactions`)

    let inside = code.split("$addCmdReactions[")[1].split("]")[0]

    let emojis = inside.split(";")

    
    emojis.forEach(async (m) => {
        await message.react(m).catch(err => message.channel.send(`Failed to react to command.\n${docs.action}/addcmdreactions`))
    })
    
    //  emojis.map(async emoji => {
        //     await message.react(emoji).catch(err => message.channel.send(`:x: Failed to react with ${emoji}`))
        // })
        code = code.replaceLast(`$addCmdReactions[${inside}]`, "")
        
    return {
        code: code
    } 
}

module.exports = addCmdReactions
