const botInGuild = async (client, message, args, name, code) => {

    const r = code.split("$botInGuild").length - 1

    if (code.split("$botInGuild")[r].startsWith("[")) {

        let inside = code.split("$botInGuild[")[r].split("]")[0]
        let id = (inside ? inside : message.guild.id)
        let guild = client.guilds.cache.get(id)
        let err = client.suppress.get(message.idd)

        if (!guild && err === undefined) check = false
        else if (!guild && err !== undefined) return message.channel.send(err).catch(err => { })

        if (!guild) check = false
        if (guild) check = true

        code = code.replaceLast(`$botInGuild[${inside}]`, check)

        return {
            code: code,
        }
    } else {

        if (!message.guild.id) check = false
        if (message.guild.id) check = true

        code = code.replaceLast("$botInGuild", check)

        return {
            code: code
        }
    }
}
module.exports = botInGuild;