const { docs } = require("../functions/docs/docs.json");

const memberRoles = async (client, message, args, name, code) => {

    let r = code.split("$memberRoles[").length - 1

    let inside = code.split("$memberRoles[")[r].split("]")[0]

    let [
        userID,
        guildID,
        option = "name"
    ] = inside.split(";");
    let err = client.suppress.get(message.idd)


    let user = (userID ? userID : message.member)
    let member = await client.users.fetch(user).catch(err => { })

    if (!member && message && err === undefined) return message.channel.send(`:x: Invalid user ID in \`$memberRoles[${inside}]\`.\n${docs.data}/memberroles`)
    else if (!member && message && err !== undefined) return message.channel.send(err).catch(err => { })

    let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)

    if (!guild) return message.channel.send(`:x: Invalid guild ID in \`$memberRoles[${inside}]\`.\n${docs.data}/memberroles`)

    let final;
    try {
        final = await guild.members.fetch(member)
    } catch (error) {
        return message.channel.send(`:x: Invalid user ID in \`$memberRoles[${inside}]\`.\n${docs.data}/memberroles`)
    }



    if (option === "mention") {
        code = code.replaceLast(`$memberRoles[${inside}]`, final.roles.cache.filter(role => role.id !== message.guild.id).map(role => `<@&${role.id}>`).join(", ").split(/@everyone/gmi).join(""))
    } else {
        code = code.replaceLast(`$memberRoles[${inside}]`, final.roles.cache.filter(role => role.id !== message.guild.id).map(role => role.name).join(", ").split(/@everyone/gmi).join(""))
    }


    return {
        code: code
    }
}

module.exports = memberRoles;