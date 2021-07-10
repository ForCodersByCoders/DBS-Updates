const embed = require('../../package/embed.js');
const execute = require("../../package/bot/executeCommand.js");

const onlyAdmin = async (client, message, args, name, code) => {

    const r = code.split("$onlyAdmin").length - 1

    if (code.split("$onlyAdmin")[r].startsWith("[")) {

        let error = code.split("$onlyAdmin[")[r].split(/]$/gm)[0]

        if (!message.member.hasPermission("ADMINISTRATOR")) {
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

        code = code.replaceLast(`$onlyAdmin[${error}]`, "")


        return {
            code: code,
        }
    } else {

        if (!message.member.hasPermission("ADMINISTRATOR")) return

        code = code.replaceLast("$onlyAdmin", "")

        return {
            code: code
        }
    }
}
module.exports = onlyAdmin;