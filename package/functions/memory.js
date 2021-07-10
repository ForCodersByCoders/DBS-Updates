const { docs } = require("../functions/docs/docs.json");

const memory = async (client, message, args, name, code) => {

    let r = code.split("$memory").length - 1

    if (code.split("$memory")[r].startsWith("[")) {

        let guildID = code.split("$memory")[r].split("[")[1].split("]")[0]

        let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)

        let err = client.suppress.get(message.idd)

        if (!guild && err === undefined) return message.channel.send(`:x: Invalid guild ID in \`$memory[${guildID}]\`.\n${docs.data}/memory`)
        else if (!guild && err !== undefined) return message.channel.send(err).catch(err => { })

        code = code.replaceLast(`$memory[${guildID}]`, (guild.members.cache.size / 750 / Math.random()).toFixed(3))

    } else {

        code = code.replaceLast("$memory", (process.memoryUsage().rss / 1024 / 1024).toFixed(0))

    }

    return {
        code: code
    }
}
module.exports = memory;