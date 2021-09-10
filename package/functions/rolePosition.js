const { docs } = require("../functions/docs/docs.json");

const rolePosition = async (client, message, args, name, code) => {

    let r = code.split("$rolePosition[").length - 1

    let inside = code.split("$rolePosition[")[r].split("]")[0]

    let [roleID, guildID] = inside.split(";");
    let err = client.suppress.get(message.idd)

    let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)
    if (!guild) return message.channel.send(`:x: Invalid guild ID in 2nd field of \`$rolePosition[${inside}]\`\n${docs.data}/roleposition`)


    let role = await guild.roles.fetch(roleID).catch(err => { })
    if (!role && err === undefined) return message.channel.send(`:x: Invalid role ID in 1st field of \`$rolePosition[${inside}]\`\n${docs.data}/roleposition`)
    else if (!role && err !== undefined) return message.channel.send(err).catch(err => { })

    code = code.replaceLast(`$rolePosition[${inside}]`, (guild.roles.cache.size - role.position))

    return {
        code: code
    }
}

module.exports = rolePosition;