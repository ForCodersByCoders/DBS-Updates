const { docs } = require("../functions/docs/docs.json");

const usersWithRoleCount = async (client, message, args, name, code) => {

    let r = code.split("$usersWithRoleCount[").length - 1

    let inside = code.split("$usersWithRoleCount[")[r].split("]")[0]

    let [roleID, guildID] = inside.split(";")
    let err = client.suppress.get(message.idd)

    let id = (guildID ? guildID : message.guild.id)
    let guild = client.guilds.cache.get(id)
    if (!guild) return message.channel.send(`:x: Invalid guild ID in 2nd field of \`$usersWithRoleCount[${inside}]\`.\n${docs.action}/userswithrolecount`)


    if ((!roleID) && (inside.split(";").length === 1) && err === undefined) {
        return message.channel.send(`:x: Role ID is not given in \`$usersWithRoleCount\`\n${docs.data}/userswithrolecount`);
    } else if ((!roleID) && (inside.split(";").length === 2) && err === undefined) {
        return message.channel.send(`:x: Role ID is not given in 1st field of \`$usersWithRoleCount\`\n${docs.data}/userswithrolecount`);
    }


    if ((roleID === "undefined" || roleID === "false") && (inside.split(";").length === 1) && err === undefined) {
        return message.channel.send(`:x: Role ID is invalid in \`$usersWithRoleCount\`\n${docs.data}/userswithrolecount`);
    } else if ((roleID === "undefined" || roleID === "false") && (inside.split(";").length === 2) && err === undefined) {
        return message.channel.send(`:x: Role ID is invalid in 1st field of \`$usersWithRoleCount\`\n${docs.data}/userswithrolecount`);
    }


    let role = await guild.roles.fetch(roleID).catch(err => { })

    if (!role && (inside.split(";").length === 1)) {
        return message.channel.send(`:x: Invalid role ID in \`$usersWithRoleCount[${inside}]\`\n${docs.data}/userswithrolecount`)
    } else if (!role && (inside.split(";").length === 2)) {
        return message.channel.send(`:x: Invalid role ID in 1st field of \`$usersWithRoleCount[${inside}]\`\n${docs.data}/userswithrolecount`)
    }


    let users = []

    guild.members.cache.forEach(x => {
        if (x.roles.cache.get(role.id)) users.push(x.user.tag)
    })

    code = code.replaceLast(`$usersWithRoleCount[${inside}]`, users.length)

    return {
        code: code
    }
}

module.exports = usersWithRoleCount;