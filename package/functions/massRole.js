const { docs } = require("../functions/docs/docs.json");

const massrole = async (client, message, args, name, code) => {

    let r = code.split("$massRole[").length - 1

    let inside = code.split("$massRole[")[r].split("]")[0]

    let [option, roleID] = inside.split(";")

    let err = client.suppress.get(message.idd)

    await message.guild.members.fetch()

    if (option !== "add") option = "remove";

    let role = message.guild.roles.cache.get(roleID)

    if (!role && err === undefined) return message.channel.send(`:x: Invalid role ID in \`$massRole[${inside}]\`.\n${docs.action}/massrole`)
    else if (!role && err !== undefined) return message.channel.send(err).catch(err => { })

    let members = message.guild.members.cache.array()

    for (const member of members) {
        await new Promise(resolve => setTimeout(resolve, 1500))

        if (option === "add") member.roles.add(role.id).catch(err => { })
        else member.roles.remove(role.id).catch(err => { })
    }

    code = code.replaceLast(`$massRole[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = massrole