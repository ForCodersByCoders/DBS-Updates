const {docs} = require("../functions/docs/docs.json");

const getAuditLogs = async (client, message, args, name, code) => {

    let r = code.split("$getAuditLogs[").length - 1

    let inside = code.split("$getAuditLogs[")[r].split("]")[0]

    let [entries, content] = inside.split(";")

    let err = client.suppress.get(message.idd)

    if (!message.guild.me.hasPermission("VIEW_AUDIT_LOG") && err === undefined) return message.channel.send(`:x: Failed to fetch logs. Bot missing permission.\n${docs.data}/getauditlogs`)
    else if (!message.guild.me.hasPermission("VIEW_AUDIT_LOG") && err !== undefined) return message.channel.send(err).catch(err => {})

    if (!content) content = "Action: {action}\nExecuter: {executor}\nTarget: {target}"

    if (isNaN(entries) || Number(entries) < 1 && err === undefined) return message.channel.send(`:x: Invalid number of entries in \`$getAuditLogs[${inside}]\`. Must be a number!\n${docs.data}/getauditlogs`)
    else if (isNaN(entries) || Number(entries < 1) && err !== undefined) return message.channel.send(err).catch(err => {})
    
    else entries = Number(entries)

    let logs = await message.guild.fetchAuditLogs({
        limit: entries
    })

    let cont = []

    let handler = true

    logs.entries.map(log => {
        if (!handler) return

        cont.push(content.replace("{target}", (log.target) ? log.target.tag : "None").replace("{executor}", (log.executor) ? log.executor.tag : "None").replace("{reason}", (log.reason) ? log.reason : "None").replace("{action}", (log.action) ? log.action : "None"))

    })

    if (!handler) return
    
    code = code.replaceLast(`$getAuditLogs[${inside}]`, cont.join("\n"))

    return {
        code: code
    }
}

module.exports = getAuditLogs