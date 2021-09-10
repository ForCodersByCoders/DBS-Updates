const embed = require("../../package/embed.js")
const execute = require("../../package/bot/executeCommand.js")

const onlyForChannels = async (client, message, args, name, code) => {

    let r = code.split("$onlyForChannels[").length - 1

    let inside = code.split("$onlyForChannels[")[r].split(/]$/gm)[0]

    let channel = inside.split(";")

    let error = channel.pop()

    if (!channel.includes(message.channel.id)) {
        if (error) {
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

    code = code.replaceLast(`$onlyForChannels[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = onlyForChannels;