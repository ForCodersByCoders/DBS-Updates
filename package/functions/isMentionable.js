const { docs } = require("../functions/docs/docs.json");

const isMentionable = async (client, message, args, name, code) => {

    let r = code.split("$isMentionable[").length - 1

    let inside = code.split("$isMentionable[")[r].split("]")[0]

    let [roleID, guildID] = inside.split(";");

    let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)

    if (!roleID) return message.channel.send(`:x: Missing role ID in 1st field of \`$isMentionable[${inside}]\`.\n${docs.conditions}/ismentionable`)

    if (guild.toString().includes("undefined") || !guild) return message.channel.send(`:x: Invalid guild ID in 2nd field of \`$isMentionable[${inside}]\`.\n${docs.conditions}/ismentionable`)


    let role;
    try {
        role = await guild.roles.fetch(roleID).catch(err => { })
        if (roleID.toString().includes("undefined") || !role) return message.channel.send(`:x: Invalid role ID in 1st field of \`$isMentionable[${inside}]\`.\n${docs.conditions}/ismentionable`)
    } catch (error) { }

    code = code.replaceLast(`$isMentionable[${inside}]`, role.mentionable)

    return {
        code: code,
    }
}

module.exports = isMentionable