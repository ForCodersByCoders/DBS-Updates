const embed = require("discordbot-script/package/embed")
const execute = require("discordbot-script/package/bot/executeCommand")

const onlyForGuilds = async (client, message, args, name, code) => {

    let r = code.split("$onlyForGuilds[").length - 1

    let inside = code.split("$onlyForGuilds[")[r].split(/]$/gm)[0]

    let guilds = inside.split(";")

    let error = guilds.pop()

    if (!guilds.includes(message.guild.id)) {
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

    code = code.replaceLast(`$onlyForGuilds[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = onlyForGuilds