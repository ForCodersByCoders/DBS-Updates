const findRole = (client, message, args, name, code) => {
    let r = code.split("$findRole[").length - 1

    let inside = code.split("$findRole[")[r].split("]")[0]

    let [id, option] = inside.split(";");

    let role = message.guild.roles.cache.get(id) || message.mentions.roles.first() || message.guild.roles.cache.find(role => role.name.toLowerCase() === id.trim().toLowerCase()) || 'undefined' || client.guilds.cache.find(g => g.roles.cache.get(id)).roles.cache.get(id)

    if (option === "mention") {
        code = code.replaceLast(`$findRole[${inside}]`, (role ? `<@&${role.id}>` : role))
    }
    else if (option === "name") {
        code = code.replaceLast(`$findRole[${inside}]`, (role ? role.name : role))
    }

    else code = code.replaceLast(`$findRole[${inside}]`, role ? role.id : role)

    return {
        code: code
    }
}

module.exports = findRole;