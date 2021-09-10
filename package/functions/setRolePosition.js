const { docs } = require("../functions/docs/docs.json");

const setRolePosition = async (client, message, args, name, code) => {

    let r = code.split("$setRolePosition[").length - 1

    let inside = code.split("$setRolePosition[")[r].split("]")[0]

    let [guildID, roleID, pos] = inside.split(";")
    let err = client.suppress.get(message.idd)

    let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)
    if (!guild) return message.channel.send(`:x: Invalid guild ID in 1st field of $setRolePosition[${inside}].\n${docs.action}/setRolePosition`)

    if (!roleID) return message.channel.send(`:x: Role ID is not provided in 2nd field of \`$setRolePosition[${inside}]\`\n${docs.action}/setroleposition`)

    let role = await message.guild.roles.cache.get(roleID);

    if (!role) return message.channel.send(`:x: Invalid role ID in 2nd field of \`$setRolePosition[${inside}]\`\n${docs.action}/setroleposition`)


    if (!role && err === undefined) return message.channel.send(`:x: Invalid role ID in 2nd field of \`$setRolePosition[${inside}]\`.\n${docs.action}/setroleposition`)
    else if (!role && err !== undefined) return message.channel.send(err).catch(err => { })

    if (!pos) pos = 0

    let result = "";
    role.setPosition(pos).catch(() => result = "undefined");

    result

    code = code.replaceLast(`$setRolePosition[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = setRolePosition