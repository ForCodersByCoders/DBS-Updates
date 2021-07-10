const {docs} = require("../functions/docs/docs.json");
const execute = require("../../package/bot/executeCommand.js")

const replaceText = async (client, message, args, name, code) => {
    
    let r = code.split("$replaceText[").length - 1
    
    let inside = code.split("$replaceText[")[r].split("]")[0]
    
    let [text, match, replacer] = inside.split(";")
    
    let err = client.suppress.get(message.idd)
    
    if (inside.split(";").length !== 3 && err === undefined) return message.channel.send(`:x: Invalid number of fields in \`$replaceText[${inside}]\`.\n${docs.action}/replacetext`)
    else if (inside.split(";").length !== 3 && err !== undefined) return message.channel.send(err).catch(err => {})
    
    if (replacer.includes("{execute:") && (text === match)) {
        let m = await execute(client, message, args, replacer)
        replacer = m.replacer;
        if (!replacer) return undefined
        
    }

    text = text.split(match).join(replacer)
    
    code = code.replaceLast(`$replaceText[${inside}]`, text)
    
    return {
        code: code
    }
}

module.exports = replaceText;


// const {docs} = require("../functions/docs/docs.json");

// const replaceText = async (client, message, args, name, code) => {

//     let r = code.split("$replaceText[").length - 1

//     let inside = code.split("$replaceText[")[r].split("]")[0]

//     let [text, match, replacer] = inside.split(";")

//     let err = client.suppress.get(message.idd)

//     if (inside.split(";").length !== 3 && err === undefined) return message.channel.send(`:x: Invalid number of fields in \`$replaceText[${inside}]\`.\n${docs.action}/replacetext`)
//     else if (inside.split(";").length !== 3 && err !== undefined) return message.channel.send(err).catch(err => {})
//     text = text.split(match).join(replacer)


//     code = code.replaceLast(`$replaceText[${inside}]`, text)

//     return {
//         code: code
//     }
// }

// module.exports = replaceText;