const embed = require("../../package/embed.js")
const execute = require("../../package/bot/executeCommand.js")

const onlyForRoles = async (client, message, args, name, code) => {

    let r = code.split("$onlyForRoles[").length - 1

    let inside = code.split("$onlyForRoles[")[r].split(/]$/gm)[0]

    let fields = inside.split(";")

    let error = fields.pop()

    let roles = fields

    if (!roles.some(r => message.member.roles.cache.some(role => role.id === r || role.name === r))) {
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

    await new Promise(resolve => setTimeout(resolve, 10))

    code = code.replaceLast(`$onlyForRoles[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = onlyForRoles