const { docs } = require("../functions/docs/docs.json");

const modifyRolePerms = async (client, message, args, name, code) => {

    let r = code.split("$modifyRolePerms[").length - 1

    let inside = code.split("$modifyRolePerms[")[r].split("]")[0]

    let [roleID, ...pms] = inside.split(";");

    let perms = {
        admin: "ADMINISTRATOR",
        manageserver: "MANAGE_GUILD",
        kick: "KICK_MEMBERS",
        addreactions: "ADD_REACTIONS",
        ban: "BAN_MEMBERS",
        manageroles: "MANAGE_ROLES",
        managechannels: "MANAGE_CHANNELS",
        managewebhooks: "MANAGE_WEBHOOKS",
        managemessages: "MANAGE_MESSAGES",
        viewauditlog: "VIEW_AUDIT_LOG",
        managenicknames: "MANAGE_NICKNAMES",
        sendmessages: "SEND_MESSAGES",
        readmessages: "READ_MESSAGE_HISTORY",
        movemembers: "MOVE_MEMBERS",
        manageemojis: "MANAGE_EMOJIS",
        viewguildinsights: "VIEW_GUILD_INSIGHTS",
        mentioneveryone: "MENTION_EVERYONE",
        embedlinks: "EMBED_LINKS",
        viewchannel: "VIEW_CHANNEL",
        createinvite: "CREATE_INSTANT_INVITE",
        mutemembers: "MUTE_MEMBERS",
        speak: "SPEAK",
        deafenmembers: "DEAFEN_MEMBERS",
        attachfiles: "ATTACH_FILES",
        connect: "CONNECT",
        stream: "STREAM",
        usevad: "USE_VAD",
        externalemojis: "USE_EXTERNAL_EMOJIS",
        sendtts: "SEND_TTS_MESSAGES",
        changenickname: "CHANGE_NICKNAME",
        priorityspeaker: "PRIORITY_SPEAKER"
    }

    let role = message.guild.roles.cache.get(roleID)

    if (!role) return message.channel.send(`:x: Invalid role ID in 1st field of \`$modifyRolePerms[${inside}]\`\n${docs.action}/modifyroleperms`)

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(`:x: Failed to modify channel perms. Bot is missing permission to manage channels.\n${docs.action}/modifyRolePerms`)


    let total = role.permissions.toArray()

    for (const perm of pms) {

        const p = perms[perm.slice(1)]

        if (!p) return message.channel.send(`:x: ${perm} is an invalid permission!\n${docs.action}/modifyroleperms`)

        if (perm[0] === "+" && !total.includes(p)) {
            total.push(p)
        } else if (perm[0] === "-") {
            total = total.filter(a => a !== p)
        }
    }

    const np = await role.setPermissions(total).catch(err => null)

    if (!np) return message.channel.send(`\`Failed to set role permissions for ${role.name}\`.`)




    code = code.replaceLast(`$modifyRolePerms[${inside}]`, "")

    return {
        code: code
    }
}
module.exports = modifyRolePerms;