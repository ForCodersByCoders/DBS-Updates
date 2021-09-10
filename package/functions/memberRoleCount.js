const { docs } = require("../functions/docs/docs.json");

const memberRoleCount = async (client, message, args, name, code) => {

    const r = code.split("$memberRoleCount").length - 1

    if (code.split("$memberRoleCount")[r].startsWith("[")) {

        let inside = code.split("$memberRoleCount[")[r].split("]")[0]
        let [userID, guildID] = inside.split(";");
        let err = client.suppress.get(message.idd)


        let user = (userID ? userID : message.member)
        let member = await client.users.fetch(user).catch(err => { })

        if (!member && message && err === undefined) return message.channel.send(`:x: Invalid user ID in \`$memberRoleCount[${inside}]\`.\n${docs.data}/memberrolecount`)
        else if (!member && message && err !== undefined) return message.channel.send(err).catch(err => { })

        let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)

        if (!guild) return message.channel.send(`:x: Invalid guild ID in \`$memberRoleCount[${inside}]\`.\n${docs.data}/memberrolecount`)

        let final;
        try {
            final = await guild.members.fetch(member)
        } catch (error) {
            return message.channel.send(`:x: Invalid user ID in \`$memberRoleCount[${inside}]\`.\n${docs.data}/memberrolecount`)
        }

        code = code.replaceLast(`$memberRoleCount[${inside}]`, final.roles.cache.size - 1)

        return {
            code: code,
        }
    } else {
        member = message.member
        code = code.replaceLast("$memberRoleCount", member.roles.cache.size - 1)

        return {
            code: code
        }
    }
}
module.exports = memberRoleCount;