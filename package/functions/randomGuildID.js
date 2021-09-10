const randomGuildID = (client, message, args, name, code) => {

    let guilds = client.guilds.cache

    code = code.replaceLast("$randomGuildID", guilds.random())

    return {
        code: code
    }
}

module.exports = randomGuildID;