const embed = require("discordbot-script/package/embed")
const execute = require("../../package/bot/executeCommand.js")

const onlyForNicknames = async (client, message, args, name, code) => {

    let r = code.split("$onlyForNicknames[").length - 1

    let inside = code.split("$onlyForNicknames[")[r].split(/]$/gm)[0]

    let fields = inside.split(";")

    let error = fields.pop()

    if (!fields.some(x => x === message.member.displayName)) {
        if (error.trim()) {
            if (error.includes("{execute:")) {
                let m = await execute(client, message, args, error)
                error = m.error;
                if (!error) return undefined
                
              }
              error = embed(error)
              return message.channel.send(error.error, error.embed)
        }

        return ""
    }

    code = code.replaceLast(`$onlyForNicknames[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = onlyForNicknames