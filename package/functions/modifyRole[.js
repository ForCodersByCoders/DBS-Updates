const { docs } = require("discordbot-script/package/functions/docs/docs");

const modifyRole = async (client, message, args, name, code) => {

    const r = code.split("$modifyRole[").length - 1

    const inside = code.split("$modifyRole[")[r].split("]")[0]

    const [
        guildID,
        roleID,
        Name,
        color,
        hoisted,
        mentionable
    ] = inside.split(";")

    const guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)

    if (!guild) return message.channel.send(`:x: Invalid guild ID in 1st field of \`$modifyRole[${inside}]\`.\n${docs.action}/modifyrole`)

    const role = await guild.roles.fetch(roleID).catch(err => { })

    if (!role) return message.channel.send(`:x: Invalid role ID in 2nd field of \`$modifyRole[${inside}]\`.\n${docs.action}/modifyrole`)

    const modify = await role.edit({
        name: Name || role.name,
        color: color || role.color,
        hoist: hoisted == "true" ? true : false,
        mentionable: mentionable == "true" ? true : false

    }).catch(err => { })

    if (!modify) return message.channel.send(`:x: Failed to modify ${role.name}! Check bot/user permissions!\n${docs.action}/modifyrole`)

    code = code.replaceLast(`$modifyRole[${inside}]`, "")

    return {
        code: code
    }
}
module.exports = modifyRole