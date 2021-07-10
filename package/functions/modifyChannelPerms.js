const { docs } = require("../functions/docs/docs.json");

const modifyChannelPerms = async (client, message, args, name, code) => {

    let r = code.split("$modifyChannelPerms[").length - 1

    let inside = code.split("modifyChannelPerms[")[r].split("]")[0]

    let fields = inside.split(";")

    let ch = fields.shift()

    let id = fields.pop()

    let opt = message.guild.roles.cache.get(id) || message.guild.members.cache.get(id)

    if (!opt) return message.channel.send(`:x: Invalid user/role ID in last field of \`$modifyChannelPerms[${inside}]\`.\n${docs.action}/modifychannelperms`)

    let denyPerms = fields.filter(x => x[0] === "-")

    let addPerms = fields.filter(x => x[0] === "+")

    let perms = {
        addreactions: "ADD_REACTIONS",
        sendmessages: "SEND_MESSAGES",
        viewchannel: "VIEW_CHANNEL",
        embedlinks: "EMBED_LINKS",
        useexternalemoji: "USE_EXTERNAL_EMOJIS",
        attachfiles: "ATTACH_FILES",
        sendttsmessage: "SEND_TTS_MESSAGES",
        readhistory: "READ_MESSAGE_HISTORY",
        managechannel: "MANAGE_CHANNELS",
        managemessages: "MANAGE_MESSAGES",
        mentioneveryone: "MENTION_EVERYONE"
    }

    let channel = message.guild.channels.cache.get(ch) || client.channels.cache.get(ch)

    if (!channel) return message.channel.send(`:x: Invalid channel ID in 1st field of \`$modifyChannelPerms[${inside}]\`\n${docs.action}/modifychannelperms`)

    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`:x: Failed to modify channel perms. Bot is missing permission to manage channels.\n${docs.action}/modifychannelperms`)

    let handler = true

    denyPerms.map((perm, y) => {
        if (!handler) return

        let p = perms[perm.split("-")[1]]

        if (!p) {
            message.channel.send(`:x: ${perm} is not a valid permission!\n${DOCS}/modifychannelperms`)

            return handler = false
        } else {
            denyPerms[y] = p
        }
    })

    addPerms.map((perm, y) => {
        if (!handler) return

        let p = perms[perm.split("+")[1]]

        if (!p) {
            message.channel.send(`:x: ${perm} is not a valid permission!\n${DOCS}/modifychannelperms`)

            return handler = false
        } else {
            addPerms[y] = p
        }
    })

    await new Promise(resolve => setTimeout(resolve, 100))

    if (!handler) return

    let object = {}

    await new Promise(resolve => setTimeout(resolve, 100))
    denyPerms = denyPerms.map(perm => Object.fromEntries([[perm, false]]));
    addPerms = addPerms.map(perm => Object.fromEntries([[perm, true]]));

    let permObj = {};
    addPerms.concat(denyPerms).forEach(perm => permObj = Object.assign(permObj, perm));
    channel.updateOverwrite(opt.id, permObj);

    code = code.replaceLast(`$modifyChannelPerms[${inside}]`, "")

    return {
        code: code
    }
}
module.exports = modifyChannelPerms;


















/*

const { docs } = require("../functions/docs/docs.json");

const modifyChannelPerms = async (client, message, args, name, code) => {

    let r = code.split("$modifyChannelPerms[").length - 1

    let inside = code.split("modifyChannelPerms[")[r].split("]")[0]

    let fields = inside.split(";")

    let channelID = fields.shift()

    let id = fields.pop()

    let option = message.guild.roles.cache.get(id) || await client.user.fetch(id).catch(err => { })
    //                                                     // message.guild.members.cache.get(id)

    if (!option) return message.channel.send(`:x: Invalid user/role ID in last field of \`$modifyChannelPerms[${inside}]\`.\n${docs.action}/modifychannelperms`)

    let denyPerms = fields.filter(x => x[0] === "-")

    let addPerms = fields.filter(x => x[0] === "+")

    let perms = {
        addreactions: "ADD_REACTIONS",
        sendmessages: "SEND_MESSAGES",
        viewchannel: "VIEW_CHANNEL",
        embedlinks: "EMBED_LINKS",
        useexternalemoji: "USE_EXTERNAL_EMOJIS",
        attachfiles: "ATTACH_FILES",
        sendttsmessage: "SEND_TTS_MESSAGES",
        readhistory: "READ_MESSAGE_HISTORY",
        managechannel: "MANAGE_CHANNELS",
        managemessages: "MANAGE_MESSAGES",
        mentioneveryone: "MENTION_EVERYONE"
    }

    let channel = await client.channels.fetch(channelID).catch(err => { })

    if (!channel) return message.channel.send(`:x: Invalid channel ID in 1st field of \`$modifyChannelPerms[${inside}]\`\n${docs.action}/modifychannelperms`)

    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`:x: Failed to modify channel perms. Bot is missing permission to manage channels.\n${docs.action}/modifychannelperms`)

    let handler = true

    denyPerms.map((perm, y) => {
        if (!handler) return

        let p = perms[perm.split("-")[1]]

        if (!p) {
            message.channel.send(`:x: ${perm} is not a valid permission!\n${DOCS}/modifychannelperms`)

            return handler = false
        } else {
            denyPerms[y] = p
        }
    })

    addPerms.map((perm, y) => {
        if (!handler) return

        let p = perms[perm.split("+")[1]]

        if (!p) {
            message.channel.send(`:x: ${perm} is not a valid permission!\n${DOCS}/modifychannelperms`)

            return handler = false
        } else {
            addPerms[y] = p
        }
    })

    await new Promise(resolve => setTimeout(resolve, 100))

    if (!handler) return

    let object = {}

    await new Promise(resolve => setTimeout(resolve, 100))
    denyPerms = denyPerms.map(perm => Object.fromEntries([[perm, false]]));
    addPerms = addPerms.map(perm => Object.fromEntries([[perm, true]]));

    let permObj = {};
    addPerms.concat(denyPerms).forEach(perm => permObj = Object.assign(permObj, perm));
    channel.updateOverwrite(option.id, permObj);

    code = code.replaceLast(`$modifyChannelPerms[${inside}]`, "")

    return {
        code: code
    }
}
module.exports = modifyChannelPerms;

*/