const db = require("quick.db")

const blackList = async (client, message, args, name, code) => {

    let users = await db.fetch("blackListUsers_0") || []

    let servers = await db.fetch("blackListServers_0") || []

    let r = code.split("$blackList[").length - 1

    let inside = code.split("$blackList[")[r].split("]")[0]

    let [option, ID, type] = inside.split(";")

    if (type === "server") {

        if (option === "add") {
            if (servers.find(x => x === ID)) return message.channel.send(`:x: Server is already Blacklisted`);

            servers.push(ID)
        } else {
            if (!servers.find(x => x === ID)) return message.channel.send(`:x: Could not find server blackListed with given ID`)
            servers = servers.filter(id => id !== ID)
        }

        db.set(`blackListServers_0`, servers)
    } else {
        if (option === "add") {
            if (users.find(x => x === ID)) return message.channel.send(`:x: User is already Blacklisted`);

            users.push(ID)
        } else {
            if (!users.find(x => x === ID)) return message.channel.send(`:x: Could not find user blackListed with given ID`)
            users = users.filter(id => id !== ID)
        }

        db.set(`blackListUsers_0`, users)
    }


    code = code.replaceLast(`$blackList[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = blackList