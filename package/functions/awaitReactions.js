const {docs} = require("../functions/docs/docs.json");
const embed = require("../../package/embed.js")
const ms = require("ms")
const edit = require('../../package/bot/edit.js')
const addreactions_ = require("../../package/bot/addreactions.js")
const delete_ = require('../../package/bot/delete.js')
const execute = require("../../package/bot/executeCommand.js")
const interpret = require("../../package/interpreter.js")

const awaitReactions = async (client, message, args, name, code) => {

    if (code.split("$awaitReactions[").length >= 3) return message.channel.send(`:x: Cant use more than one \`$awaitReactions\`.\n${docs.action}/awaitreactions`)

    let inside = code.split("$awaitReactions[")[1].split("]")[0]
    
    inside = await interpret(client, message, args, name, inside)
       
let pros = `$awaitReactions[${inside}]`

        client.awaitReactions.set(message.idd, pros)

    code = code.replace(`$awaitReactions[${inside}]`, "")
    
    return {
        code: code
    }
}

module.exports = awaitReactions;




// const embed = require("../../package/embed.js")

// const ms = require("ms")

// const edit = require('../../package/bot/edit.js')
// const addreactions_ = require("../../package/bot/addreactions.js")
// const delete_ = require('../../package/bot/delete.js')

// const interpret = require("../../package/interpreter.js")

// const awaitReactions = async (client, message, args, name, code) => {

//     if (code.split("$awaitReactions[").length >= 3) return message.channel.send(`:x: Cant use more than one $awaitReaction.`)

//     let inside = code.split("$awaitReactions[")[1].split("]")[0]

//     let [emojis, userID, time, command, error] = inside.split(";")
       
//     let err = client.suppress.get(message.idd)
    
//     if (!command && err === undefined) return message.channel.send(`:x: Not enough fields were given in \`$awaitReactions[${inside}]\``)

//     else if (!command && err !== undefined) return message.channel.send(err).catch(err => {})
    
//     let object = {}

//     let cmds = command.split(",")

//     let emjs = emojis.split(",")

//     emjs.map((e, y) => {
//         object[e] = cmds[y]
//     })
        



//         client.awaitReactions.set(message.idd, object)

//     code = code.replace(`$awaitReactions[${inside}]`, "")
    
//     return {
//         code: code
//     }
// }

// module.exports = awaitReactions