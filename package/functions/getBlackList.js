const db = require("quick.db")

const getBlackList = async (client, message, args, name, code) => {

    let users = await db.fetch("blackListUsers_0") || []

    let servers = await db.fetch("blackListServers_0") || []

    let r = code.split("$getBlackList[").length - 1

    let inside = code.split("$getBlackList[")[r].split("]")[0]

    let [type, option, amount] = inside.split(";")

    if (!option) option = `{id} - {name}`

    if (!amount) amount = 10

    let content = []

    if (type === "users") {
        users.map(id => {
            if (client.users.cache.has(id)) {
                let user = client.users.cache.get(id)

                if (!user) return

                content.push(option.replace("{id}", id).replace(`{name}`, user.username).replace(`{tag}`, user.tag))
            }
        })
    } else {
        servers.map(id => {
            if (client.guilds.cache.has(id)) {
                let guild = client.guilds.cache.get(id)

                if (!guild) return;

                content.push(option.replace("{id}", id).replace(`{name}`, guild.name).replace(`{members}`, guild.membersCount))
            }
        })
    }

    code = code.replaceLast(`$getBlackList[${inside}]`, content.slice(0, Number(amount)).join("\n"))

    return {
        code: code
    }
}

module.exports = getBlackList