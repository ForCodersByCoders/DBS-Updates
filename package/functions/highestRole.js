const { docs } = require("../functions/docs/docs.json");

const highestRole = async (client, message, args, name, code, channel) => {

    const r = code.split("$highestRole").length - 1

    if (code.split("$highestRole")[r].startsWith("[")) {

        let inside = code.split("$highestRole[")[r].split("]")[0]
        let [userID, guildID] = inside.split(";");


        let user = (userID ? userID : message.author.id)
        let member = await client.users.fetch(user).catch(err => { })
        let err = client.suppress.get(message.idd)

        if (!member && err === undefined) return message.channel.send(`:x: Invalid user ID in 1st field of \`$highestRole[${inside}]\`.\n${docs.data}/highestrole`)
        else if (!member && err !== undefined) return message.channel.send(err).catch(err => { })

        let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)
        if (!guild) return message.channel.send(`:x: Invalid guild ID in 2nd field of \`$highestRole[${inside}]\`.\n${docs.data}/highestrole`)

        let final;
        try {
            final = await guild.members.fetch(member)
        } catch (error) {
            return message.channel.send(`:x: Invalid user ID in 1st field of \`$highestRole[${inside}]\`.\n${docs.data}/highestrole`)
        }

        code = code.replaceLast(`$highestRole[${inside}]`, final.roles.highest.id)

        return {
            code: code,
        }
    } else {

        code = code.replaceLast("$highestRole", message.guild.roles.cache.sort((x, y) => y.position - x.position).first())

        return {
            code: code
        }
    }
}
module.exports = highestRole;