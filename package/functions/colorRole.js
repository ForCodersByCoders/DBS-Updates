const { docs } = require("../functions/docs/docs.json");

const colorRole = async (client, message, args, name, code) => {

    let err = client.suppress.get(message.idd)
    let r = code.split("$colorRole[").length - 1
    let inside = code.split("$colorRole[")[r].split("]")[0]
    let [roleID, guildID, hex] = inside.split(";");

    let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)

    if (!hex && err === undefined) return message.channel.send(`:x: Hex color is not given in \`$colorRole[${inside}]\`.\n${docs.action}/colorrole`)
    if (!roleID && err === undefined) return message.channel.send(`:x: Role ID is not given in \`$colorRole[${inside}]\`.\n${docs.action}/colorrole`)
    if (!guild && err === undefined) return message.channel.send(`:x: Invalid guild ID in \`$colorRole[${inside}]\`.\n${docs.action}/colorrole`)



    let role;
    try {
        role = await guild.roles.fetch(roleID)
    } catch (error) {
        return message.channel.send(`:x: Invalid role ID in \`$colorRole[${inside}]\`.\n${docs.action}/colorrole`)
    }


    if (!role && err === undefined) return message.channel.send(`:x: Invalid role ID in \`$colorRole[${inside}]\`.\n${docs.action}/colorrole`)


    role = await role.setColor(hex)

    if (!message.guild.me.hasPermission("MANAGE_ROLES") && err === undefined) return message.channel.send(`:x: Failed to change color of the role. Bot missing permissions.\n${docs.action}/createchannel`)
    else if (!message.guild.me.hasPermission("MANAGE_ROLES") && err !== undefined) return message.channel.send(err).catch(err => { })

    if (!role && err === undefined) return message.channel.send(`:x: Unable to change color of the role. Check role hoisting hierarchy.\n${docs.action}/colorrole`)

    code = code.replaceLast(`$colorRole[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = colorRole;