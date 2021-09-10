const embed = require("../../package/embed.js")
const execute = require("../../package/bot/executeCommand.js")

const onlyNSFW = async (client, message, args, name, code, channel) => {

    const r = code.split("$onlyNSFW").length - 1

    if (code.split("$onlyNSFW")[r].startsWith("[")) {

        let error = code.split("$onlyNSFW[")[r].split(/]$/gm)[0]

        if (message.channel.nsfw === true) {
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

        if (!error && message.channel.nsfw === false) return;

        code = code.replaceLast(`$onlyNSFW[${error}]`, "")

        return {
            code: code,
        }
    } else {

        if (message.channel.nsfw === true) return

        code = code.replaceLast("$onlyNSFW", "")

        return {
            code: code
        }
    }
}
module.exports = onlyNSFW;