const embed = require('../../package/embed.js')
const {docs} = require("../functions/docs/docs.json");
const execute = require("../../package/bot/executeCommand.js")

const onlyIfStartsWith = async (client, message, args, name, code) => {

    let r = code.split("$onlyIfStartsWith[").length - 1

    let inside = code.split("$onlyIfStartsWith[")[r].split(/]$/gm)[0]

    let [msg, msgstarts, error] = inside.split(";")
    
    if (!msg) return message.channel.send(`:x: No message provided in \`$onlyIfStartsWith[${inside}]\`.\n${docs.limiters}/onlyifstartswith`)
    if (!msgstarts) return message.channel.send(`:x: No argument provided in \`$onlyIfStartsWith[${inside}]\`.\n${docs.limiters}/onlyifstartswith`)
    // if (!error) return message.channel.send(`:x: No error provided in \`$onlyIfStartsWith[${inside}]\`.\n${docs.limiters}/onlyifstartswith`)

    if(!msg.startsWith(msgstarts)) {
        if(error) {
        if (error.includes("{execute:")) {
            let m = await execute(client, message, args, error)
            error = m.error;
            if (!error) return undefined
            
          }
          error = embed(error)
          message.channel.send(error.error, error.embed)
        }
      return "" 
}

    code = code.replaceLast(`$onlyIfStartsWith[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = onlyIfStartsWith