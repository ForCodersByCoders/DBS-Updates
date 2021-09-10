const { docs } = require("../functions/docs/docs.json");
let failError = `:x: Failed to modify ${channel.name}! Check bot/user permissions!\n${docs.action}/modifychannel`
let field1Error = `:x: Invalid channel ID in 1st field of \`$modifyChannel[${inside}]\`.\n${docs.action}/modifychannel`
let field2Error = `:x: Invalid option in 2nd field of \`$modifyChannel[${inside}]\`.\n${docs.action}/modifychannel`
let Missingfield2Error = `:x: Missing option in 2nd field of \`$modifyChannel[${inside}]\`.\n${docs.action}/modifychannel`


const modifyChannel = async (client, message, args, name, code) => {

    const r = code.split("$modifyChannel[").length - 1

    const inside = code.split("$modifyChannel[")[r].split("]")[0]

    const [channelID, option, content] = inside.split(";")

    const channel = await client.channels.fetch(channelID ? channelID : message.channel.id).catch(err => { })

    if (!channel) return message.channel.send(field1Error)
    if (!option) return message.channel.send(Missingfield2Error)

    let opt = option;

    if (![
        "name",
        "topic",
        "position",
        "nsfw",
        "parentid",
        "lockperms",
        "slowmode"
    ].includes(option.toLowerCase())) return message.channel.send(field2Error)


    switch (opt) {
        case "name": let channelname = channel.edit({ name: content || channel.name }).catch(err => { })
            if (!channelname) return message.channel.send(failError)
            break;
        case "topic": let channeltopic = channel.edit({ topic: content || channel.topic }).catch(err => { })
            if (!channeltopic) return message.channel.send(failError)
            break;
        case "position": let channelposition = channel.edit({ position: content - 1 || "" }).catch(err => { })
            if (!channelposition) return message.channel.send(failError)
            break;
        case "nsfw": let channelnsfw = channel.edit({ nsfw: content || "" }).catch(err => { })
            if (!channelnsfw) return message.channel.send(failError)
            break;
        case "parentid": let parentchannelid = channel.edit({ parentID: content || "" }).catch(err => { })
            if (!parentchannelid) return message.channel.send(failError)
            break;
        case "lockperms": let channellock = channel.edit({ lockPermissions: content || "" }).catch(err => { })
            if (!channellock) return message.channel.send(failError)
            break;
        case "slowmode": if (isNaN(content)) return message.channel.send(`:x: Slowmode input is not a number in 3rd field of \`$modifyChannel[${inside}]!\n${docs.action}/modifychannel`)
            let channelslowmode = channel.edit({ rateLimitPerUser: Number(content) || 0 }).catch(err => { })
            if (!channelslowmode) return message.channel.send(failError)
            break;
    }

    code = code.replaceLast(`$modifyChannel[${inside}]`, "")

    return {
        code: code
    }
}
module.exports = modifyChannel;