const findChannel = async (client, message, args, name, code) => {
    let r = code.split("$findChannel[").length - 1

    let inside = code.split("$findChannel[")[r].split("]")[0]

    let [id, option] = inside.split(";");

    // let channel = message.guild.channels.cache.get(id) || message.mentions.channels.first() || message.guild.channels.cache.find(channel => (channel.name.toLowerCase() === id.trim().toLowerCase() || channel.id === id.trim()) && channel.type === "category") || 'undefined' || client.guilds.cache.find(g => g.channels.cache.get(id)).channels.cache.get(id)


    let channel;
    try {
        channel = await client.channels.cache.find(channel => (channel.name.toLowerCase() === id.trim().toLowerCase() || channel.id === id.trim())) || message.mentions.channels.first() || client.channels.cache.find(g => g.channels.cache.get(id)).channels.cache.get(id)
    } catch (error) { }


    if (option === "mention") {
        code = code.replaceLast(`$findChannel[${inside}]`, (channel ? `<#${channel.id}>` : channel))
    }
    else if (option === "name") {
        code = code.replaceLast(`$findChannel[${inside}]`, (channel ? channel.name : channel))
    }

    else code = code.replaceLast(`$findChannel[${inside}]`, (channel ? channel.id : channel))

    return {
        code: code
    }
}
module.exports = findChannel;