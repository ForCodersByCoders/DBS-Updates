const embed = require("../../package/embed.js")
const execute = require("../../package/bot/executeCommand.js")

const onlyIfMessageContains = async (client, message, args, name, code) => {

    let r = code.split("$onlyIfMessageContains[").length - 1

    let inside = code.split("$onlyIfMessageContains[")[r].split(/]$/gm)[0]

    let fields = inside.split(";")

    let msg = fields;

    let error = fields.pop()


    if (!msg.some(e => message.content.includes(e))) {
        if (error) {
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

    code = code.replaceLast(`$onlyIfMessageContains[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = onlyIfMessageContains