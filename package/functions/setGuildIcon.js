const { docs } = require("../functions/docs/docs.json");

const setGuildIcon = async (client, message, args, name, code) => {

    const r = code.split("$setGuildIcon[").length - 1
    const inside = code.split("$setGuildIcon[")[r].split("]")[0]

    let [icon, guildID] = inside.split(";")


    let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)
    if (!guild) return message.channel.send(`:x: Invalid guild ID in 2nd field of $setGuildIcon[${inside}].\n${docs.action}/setguildicon`)

    if (!icon) return message.channel.send(`:x: Missing new image URL in 1st field of $setGuildIcon[${inside}].\n${docs.action}/setguildicon`)

    let result;
    try {
        result = await guild.setIcon(icon)
    } catch {
        return message.channel.send(`:x: Failed to change guild icon in $setGuildIcon[${inside}]. Check bot/user permissions!\n${docs.action}/setguildicon`)
    }

    result

    code = code.replaceLast(`$setGuildIcon[${inside}]`, "")

    return {
        code: code
    }
}
module.exports = setGuildIcon