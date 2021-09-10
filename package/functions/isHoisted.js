const { docs } = require("../functions/docs/docs.json");

const isHoisted = async (client, message, args, name, code) => {

    let r = code.split("$isHoisted[").length - 1

    let inside = code.split("$isHoisted[")[r].split("]")[0]

    let [roleID, guildID] = inside.split(";");

    let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)

    if (!roleID) return message.channel.send(`:x: Missing role ID in 1st field of \`$isHoisted[${inside}]\`.\n${docs.conditions}/ishoisted`)

    if (guild.toString().includes("undefined") || !guild) return message.channel.send(`:x: Invalid guild ID in 2nd field of \`$isHoisted[${inside}]\`.\n${docs.conditions}/ishoisted`)


    let role;
    try {
        role = await guild.roles.fetch(roleID).catch(err => { })
        if (roleID.toString().includes("undefined") || !role) return message.channel.send(`:x: Invalid role ID in 1st field of \`$isHoisted[${inside}]\`.\n${docs.conditions}/ishoisted`)
    } catch (error) { }



    code = code.replaceLast(`$isHoisted[${inside}]`, role.hoist)

    return {
        code: code,
    }
}

module.exports = isHoisted