const { docs } = require("../functions/docs/docs.json");

const deleteRole = async (client, message, args, name, code) => {
    let r = code.split("$deleteRole[").length - 1
    let inside = code.split("$deleteRole[")[r].split("]")[0]

    let error = client.suppress.get(message.idd);


    if (!inside && error === undefined) return message.channel.send(`:x: Role ID is not given $deleteRole[${inside}].\n${docs.action}/deleterole`)

    let role = await message.guild.roles.fetch(inside) || message.guild.roles.cache.get(inside);

    if (!role && error === undefined) return message.channel.send(`:x: Unable to find the Role \`$deleteRole[${inside}]\`.\n${docs.action}/deleterole`)


    try {
        let process = await role.delete('The role needed to go')
        process = await process.deleted;
    } catch (err) {
        return message.channel.send(`:x: Unable to delete **` + role.name + `** role! Check bot/user permissions!`)
    }

    code = code.replace(`$deleteRole[${inside}]`, "")

    return {
        code: code
    }

}

module.exports = deleteRole;