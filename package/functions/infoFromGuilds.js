const infoFromGuilds = async (client, message, args, name, code) => {

    let r = code.split("$infoFromGuilds[").length - 1

    let inside = code.split("$infoFromGuilds[")[r].split("]")[0]

    let fields = inside.split(";")

    let separator = fields[0] || "\n"

    let type = fields[1] || "\`Owner:\` {owner}\n\`Server:\` {name}\`\nID:\` {id}\n\`Members:\` {members}\n\`Memory:\` {memory}KB\n"

    let guilds = client.guilds.cache.array()

    let content = []

    let sortedguilds = []
    
    for (const guild of guilds) {

        await guild.members.fetch()

        guild.memory = guild.members.cache.size / 750 / Math.random()

        sortedguilds.push(guild)
    }

    sortedguilds = sortedguilds.sort((x, y) => y.members.size - x.members.size)

    for (const guild of sortedguilds) {
        content.push(type.replace(`{memory}`, guild.memory.toFixed(3)).replace(`{name}`, guild.name).replace(`{id}`, guild.id).replace(`{members}`, guild.members.cache.size).replace("{owner}", client.users.cache.get(guild.ownerID).tag))
    }

    code = code.replaceLast(`$infoFromGuilds[${inside}]`, content.slice(0, 10).join(separator))

    return {
        code: code
    }
}

module.exports = infoFromGuilds