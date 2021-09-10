const { docs } = require("../functions/docs/docs.json");

const roleID = async (client, message, args, name, code) => {

    let r = code.split("$roleID[").length - 1

    let inside = code.split("$roleID[")[r].split("]")[0]

    let [roleName, guildID] = inside.split(";");
    let err = client.suppress.get(message.idd)

    let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)
    if (!guild) return message.channel.send(`:x: Invalid guild ID in 2nd field of \`$roleID[${inside}]\`\n${docs.data}/roleid`)

    let role = guild.roles.cache.find(role => role.name === roleName)

    if (!role && err === undefined) return message.channel.send(`:x: Invalid role name in 1st field of \`$roleID[${inside}]\`\n${docs.data}/roleid`)
    else if (!role && err !== undefined) return message.channel.send(err).catch(err => { })

    code = code.replaceLast(`$roleID[${inside}]`, role.id)

    return {
        code: code
    }
}

module.exports = roleID;