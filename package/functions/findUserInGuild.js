const findUserInGuild = async (client, message, args, name, code) => {
    let r = code.split("$findUserInGuild[").length - 1

    let inside = code.split("$findUserInGuild[")[r].split("]")[0]

    let [user, guild, option] = inside.split(";")

    let USER = client.users.cache.get(user) || message.mentions.users.first() || client.users.cache.find(user => user.username.toLowerCase() === user.toLowerCase()) || 'undefined'

    let GUILD = client.guilds.cache.get(guild) || message.guild.id

    try {
        u = await GUILD.members.fetch(USER)
    } catch {
        u = 'undefined'
    }

    if (option === "mention") {
        code = code.replaceLast(`$findUserInGuild[${inside}]`, (u ? `<@!${u.id}>` : u))
    }
    else if (option === "name") {
        code = code.replaceLast(`$findUserInGuild[${inside}]`, (u ? u.user.username : u))
    }
    else if (option === "tag") {
        code = code.replaceLast(`$findUserInGuild[${inside}]`, (u ? u.user.tag : u))
    }

    else code = code.replaceLast(`$findUserInGuild[${inside}]`, (u ? u.id : u))

    return {
        code: code
    }
}
module.exports = findUserInGuild;