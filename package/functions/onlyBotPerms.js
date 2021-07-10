require("../../package/Utils/permissions.js");
const execute = require("../../package/bot/executeCommand.js")

const embed = require("../../package/embed.js")

const onlyBotPerms = async (client, message, args, name, code) => {

    let r = code.split("$onlyBotPerms[").length - 1

    let inside = code.split("$onlyBotPerms[")[r].split(/]$/gm)[0]

    let fields = inside.split(";")

    let error = fields.pop()

    let array = []

    for (let i = 0; i < fields.length; i++) {
        if (perms[fields[i]] && !message.guild.me.hasPermission([perms[fields[i]]])) {

            array.push(perms[fields[i]])

        }
    }

    if (array.length) {

        if (error) {
            if (error.includes("{execute:")) {
                let m = await execute(client, message, args, error)
                error = m.error;
                if (!error) return undefined

            }
            error = embed(error)
            //   message.channel.send(error.error.replace(/{perms}/, array.join(", ")), error.embed)

            try {
                message.channel.send(error.error.replace(/{perms}/g, array.join(", ")), error.embed)
            } catch (e) {
                console.log(e)
            }
        }
    }

    if (array.length) return;


    code = code.replaceLast(`$onlyBotPerms[${inside}]`, "")

    return {
        code: code
    }
}
module.exports = onlyBotPerms;