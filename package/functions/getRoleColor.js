const { docs } = require("../functions/docs/docs.json");

const getRoleColor = async (client, message, args, name, code) => {
    let err = client.suppress.get(message.idd)
    let r = code.split("$getRoleColor[").length - 1

    let inside = code.split("$getRoleColor[")[r].split("]")[0]

    let [roleID, guildID] = inside.split(";");

    let guild = client.guilds.cache.get(guildID || message.guild.id)

    if (!guild) return message.channel.send(`:x: Invalid guild ID in 2nd field of \`$getRoleColor[${inside}]\`.\n${docs.data}/getrolecolor`)


    let role;
    try {
        role = await guild.roles.fetch(roleID).catch(err => { })
        if (!role) return message.channel.send(`:x: Invalid role ID in 1st field of \`$getRoleColor[${inside}]\`.\n${docs.data}/getrolecolor`)
    } catch {
    }


    let result;
    try {
        result = await role.color.toString(16)
    } catch (error) {
        return message.channel.send(`:x: Role ID does not belong in this guild! \`$getRoleColor[${inside}]\`.\n${docs.data}/getrolecolor`)
    }


    code = code.replaceLast(`$getRoleColor[${inside}]`, result)

    return {
        code: code
    }
}

module.exports = getRoleColor