const {docs} = require("../functions/docs/docs.json");

const getAuditLog = async (client, message, args, name, code) => {

    let r = code.split("$getAuditLog[").length - 1

    let inside = code.split("$getAuditLog[")[r].split("]")[0]

    let [userID, option] = inside.split(";")

    let err = client.suppress.get(message.idd)

    if (!message.guild.me.hasPermission("VIEW_AUDIT_LOG") && err === undefined) return message.channel.send(`:x: Failed to get audit log entries. Bot missing permission.\n${docs.data}/getauditlog`)
    else if (!message.guild.me.hasPermission("VIEW_AUDIT_LOG") && err !== undefined) return message.channel.send(err).catch(err => {})
    if (!userID) userID = message.author.id 

    let user = (userID === "everyone" ? "everyone" : client.users.cache.get(userID))

    if (!user && err === undefined) return message.channel.send(`:x: Invalid user ID in \`$getAuditLog[${inside}]\`.\n${docs.data}/getauditlog`)
    else if (!user && err !== undefined) return message.channel.send(err).catch(err => {})

    let log;

    if (userID === "everyone") {
        logs = await message.guild.fetchAuditLogs()
        log = logs.entries.first()
    } else {
        let logs = await message.guild.fetchAuditLogs({
            user: user
        })
        log = logs.entries.first()
    }
    
    let result;
    let opt = {
        executor: (log.executer) ? log.executer.id : "None",
        target: (log.target) ? log.target.id : "None",
        action: log.action,
        reason: log.reason || ""
    }[option]

    if (!log) result = `:x: Nothing found`
    
    if (opt === undefined && err === undefined) return message.channel.send(`:x: Invalid option in \`$getAuditLog[${inside}]\`.\n${docs.data}/getauditlog`)
    else if (opt === undefined && err !== undefined) return message.channel.send(err).catch(err => {})
    
    code = code.replaceLast(`$getAuditLog[${inside}]`, opt)

    return {
        code: code
    }
}

module.exports = getAuditLog