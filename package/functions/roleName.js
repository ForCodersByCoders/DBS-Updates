const { docs } = require("../functions/docs/docs.json");

const roleName = async (client, message, args, name, code) => {

    let r = code.split("$roleName[").length - 1

    let inside = code.split("$roleName[")[r].split("]")[0]

    let [roleID, guildID] = inside.split(";");
    let err = client.suppress.get(message.idd)

    let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)
    if (!guild) return message.channel.send(`:x: Invalid guild ID in 2nd field of \`$roleName[${inside}]\`\n${docs.data}/rolename`)


    let role = await guild.roles.fetch(roleID).catch(err => { })
    if (!role && err === undefined) return message.channel.send(`:x: Invalid role ID in 1st field of \`$roleName[${inside}]\`\n${docs.data}/rolename`)
    else if (!role && err !== undefined) return message.channel.send(err).catch(err => { })

    code = code.replaceLast(`$roleName[${inside}]`, role.name)

    return {
        code: code
    }
}

module.exports = roleName;