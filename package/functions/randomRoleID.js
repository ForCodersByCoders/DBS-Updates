const { docs } = require("../functions/docs/docs.json");

const randomRoleID = async (client, message, args, name, code) => {

    const r = code.split("$randomRoleID").length - 1

    if (code.split("$randomRoleID")[r].startsWith("[")) {

        let inside = code.split("$randomRoleID[")[r].split("]")[0]

        let guild = client.guilds.cache.get(inside ? inside : message.guild.id)
        if (!guild) return message.channel.send(`:x: Invalid guild ID in \`$randomRoleID[${inside}]\`.\n${docs.data}/randomroleid`)

        let result = guild.roles.cache.random()


        code = code.replaceLast(`$randomRoleID[${inside}]`, result)

        return {
            code: code,
        }
    } else {
        let result = message.guild.roles.cache.random()

        code = code.replaceLast("$randomRoleID", result)

        return {
            code: code
        }
    }
}
module.exports = randomRoleID;