const findCategory = async (client, message, args, name, code) => {
    let r = code.split("$findCategory[").length - 1

    let inside = code.split("$findCategory[")[r].split("]")[0]

    let [id, option] = inside.split(";");

    let channel;
    try {
        channel = await client.channels.cache.find(channel => (channel.name.toLowerCase() === id.trim().toLowerCase() || channel.id === id.trim()) && channel.type === "category") || 'undefined'
    } catch (error) { }

    // let channel = message.guild.channels.cache.find(channel => (channel.name.toLowerCase() === id.trim().toLowerCase() || channel.id === id.trim()) && channel.type === "category") || 'undefined'

    if (option === "name") {
        code = code.replaceLast(`$findCategory[${inside}]`, (channel ? channel.name : channel))
    }

    else code = code.replaceLast(`$findCategory[${inside}]`, (channel ? channel.id : channel))

    return {
        code: code
    }
}

module.exports = findCategory;