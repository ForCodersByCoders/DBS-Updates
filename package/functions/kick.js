const { docs } = require("../functions/docs/docs.json");

const kick = async (client, message, args, name, code) => {

    let r = code.split("$kick[").length - 1

    let inside = code.split("$kick[")[r].split("]")[0]

    let [userID, reason] = inside.split(";")

    let member = message.guild.members.cache.get(userID)

    let err = client.suppress.get(message.idd)

    if (!member && err === undefined) return message.channel.send(`:x: Invalid user ID in \`$kick[${inside}]\`.\n${docs.action}/kick`)
    else if (!member && err !== undefined) return message.channel.send(err).catch(err => { })

    if (member && message.guild.me.roles.highest.position <= member.roles.highest.position) return message.channel.send(`:x: Failed to kick user. Check bot role hoisting hierarchy.\n${docs.action}/kick`)

    if (!message.guild.me.hasPermission("KICK_MEMBERS") && err === undefined) return message.channel.send(`:x: Failed to kick user. Check bot permissions.\n${docs.action}/kick`)
    else if (!message.guild.me.hasPermission("KICK_MEMBERS") && err !== undefined) return message.channel.send(err).catch(err => { })

    member = await member.kick(reason).catch(Err => { })


    code = code.replaceLast(`$kick[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = kick