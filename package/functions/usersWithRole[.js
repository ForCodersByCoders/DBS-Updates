const { docs } = require("../functions/docs/docs.json");

const usersWithRole = async (client, message, args, name, code) => {

    let r = code.split("$usersWithRole[").length - 1

    let inside = code.split("$usersWithRole[")[r].split("]")[0]

    let [roleID, guildID] = inside.split(";")
    let err = client.suppress.get(message.idd)

    let id = (guildID ? guildID : message.guild.id)
    let guild = client.guilds.cache.get(id)
    if (!guild) return message.channel.send(`:x: Invalid guild ID in 2nd field of \`$usersWithRole[${inside}]\`.\n${docs.action}/userswithrole`)




    if ((!roleID) && (inside.split(";").length === 1) && err === undefined) {
        return message.channel.send(`:x: Role ID is not given in \`$usersWithRole\`\n${docs.data}/userswithrole`);
    } else if ((!roleID) && (inside.split(";").length === 2) && err === undefined) {
        return message.channel.send(`:x: Role ID is not given in 1st field of \`$usersWithRole\`\n${docs.data}/userswithrole`);
    }


    if ((roleID === "undefined" || roleID === "false") && (inside.split(";").length === 1) && err === undefined) {
        return message.channel.send(`:x: Role ID is invalid in \`$usersWithRole\`\n${docs.data}/userswithrole`);
    } else if ((roleID === "undefined" || roleID === "false") && (inside.split(";").length === 2) && err === undefined) {
        return message.channel.send(`:x: Role ID is invalid in 1st field of \`$usersWithRole\`\n${docs.data}/userswithrole`);
    }


    let role = await guild.roles.fetch(roleID).catch(err => { })

    if (!role && (inside.split(";").length === 1)) {
        return message.channel.send(`:x: Invalid role ID in \`$usersWithRole[${inside}]\`\n${docs.data}/userswithrole`)
    } else if (!role && (inside.split(";").length === 2)) {
        return message.channel.send(`:x: Invalid role ID in 1st field of \`$usersWithRole[${inside}]\`\n${docs.data}/userswithrole`)
    }


    let users = []

    guild.members.cache.forEach(x => {
        if (x.roles.cache.get(role.id)) users.push(x.user.tag)
    })

    code = code.replaceLast(`$usersWithRole[${inside}]`, users.join("\n") || "None")

    return {
        code: code
    }
}

module.exports = usersWithRole;