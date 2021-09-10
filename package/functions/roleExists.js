const { docs } = require("../functions/docs/docs.json");

const roleExists = async (client, message, args, name, code) => {

    let r = code.split("$roleExists[").length - 1

    let inside = code.split("$roleExists[")[r].split("]")[0]

    let [roleID, guildID] = inside.split(";");

    let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)

    if (!guild) return message.channel.send(`:x: Invalid guild ID in 2nd field of \`$roleExists[${inside}]\`.\n${docs.conditions}/roleexists`)

    let role = await guild.roles.fetch(roleID).catch(err => { })


    code = code.replaceLast(`$roleExists[${inside}]`, role ? "true" : "false")

    return {
        code: code
    }
}

module.exports = roleExists;