const embed = require("../../package/embed.js")
const execute = require("../../package/bot/executeCommand.js")

const onlyForUsernames = async (client, message, args, name, code) => {

    let r = code.split("$onlyForUsernames[").length - 1

    let inside = code.split("$onlyForUsernames[")[r].split(/]$/gm)[0]

    let fields = inside.split(";")

    let error = fields.pop()

    if (!fields.some(x => x === message.author.username)) {
        if (error.trim()) {
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

    code = code.replaceLast(`$onlyForUsernames[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = onlyForUsernames