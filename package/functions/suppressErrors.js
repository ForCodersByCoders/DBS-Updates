const embed = require('../../package/embed.js');
const { docs } = require("../functions/docs/docs.json");
const execute = require("../../package/bot/executeCommand.js");

const suppressErrors = async (client, message, args, name, code) => {
    if (code.split("$suppressErrors[").length >= 3) return message.channel.send(`Can't use more than one $suppressErrors.\n${docs.limiters}/suppresserrors`)

    const r = code.split("$suppressErrors").length - 1

    if (code.split("$suppressErrors")[r].startsWith("[")) {

        let error = code.split("$suppressErrors[")[1].split(/]$/gm)[0]

        if (!error) {
            return ""
        }
        else if (error) {
            if (error.includes("{execute:")) {
                let m = await execute(client, message, args, error)
                error = m.error;
                if (!error) return undefined

            }
            error = embed(error)
            return message.channel.send(error.error, error.embed)
        }

        client.suppress.set(message.idd, error)

        code = code.replaceLast(`$suppressErrors[${error}]`, "")

        return {
            code: code,
        }
    } else {
        if (code.includes("$suppressErrors")) {
            return ""
        }
        code = code.replaceLast("$suppressErrors", "")

        return {
            code: code
        }
    }
}
module.exports = suppressErrors;