const { docs } = require("../functions/docs/docs.json");

const setChannelName = async (client, message, args, name, code) => {

    let r = code.split("$setChannelName[").length - 1

    let inside = code.split("$setChannelName[")[r].split("]")[0]
    let err = client.suppress.get(message.idd)
    let [channelID, Name] = inside.split(";");

    let channel = await client.channels.fetch(channelID).catch(err => { })

    if (!channel && err === undefined) return message.channel.send(`:x: Invalid channel ID in \`$setChannelName[${inside}]\`.\n${docs.action}/setchannelname`)
    if (!Name) return message.channel.send(`:x: No message provided in \`$setChannelName[${inside}]\`.\n${docs.action}/setchannelname`)
    else if (!channel && err !== undefined) return message.channel.send(err).catch(err => { })

    let result = await channel.setName(Name).catch(err => { })
    if (!result) return message.channel.send(`:x: Failed to set channel name in \`$setChannelName[${inside}]\`. Check bot/user permissions!\n${docs.action}/setchannelname.`)

    result

    code = code.replaceLast(`$setChannelName[${inside}]`, "")

    return {
        code: code,
    }
}

module.exports = setChannelName;