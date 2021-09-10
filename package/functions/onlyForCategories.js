const embed = require("../../package/embed.js")
const execute = require("../../package/bot/executeCommand.js")

const onlyForCategories = async (client, message, args, name, code) => {

    let r = code.split("$onlyForCategories[").length - 1

    let inside = code.split("$onlyForCategories[")[r].split(/]$/gm)[0]

    let channel = inside.split(";")

    let error = channel.pop()

    if (!channel.includes(message.channel.parentID)) {
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

    code = code.replaceLast(`$onlyForCategories[${inside}]`, "")

    return {
        code: code
    }
}
module.exports = onlyForCategories;