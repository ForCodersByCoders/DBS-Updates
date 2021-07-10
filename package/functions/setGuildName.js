// const { docs } = require("../functions/docs/docs.json");

// const setGuildName = async (client, message, args, name, code) => {

//     const r = code.split("$setGuildName[").length - 1
//     const inside = code.split("$setGuildName[")[r].split("]")[0]

//     const guild = await message.guild.edit({ name: inside }).catch(err => { })

//     if (!guild) return message.channel.send(`:x: Failed to set guild name! Check bot/user permissions!\n${docs.action}/setguildname`)

//     code = code.replaceLast(`$setGuildName[${inside}]`, "")

//     return {
//         code: code
//     }
// }
// module.exports = setGuildName






const { docs } = require("../functions/docs/docs.json");

const setGuildName = async (client, message, args, name, code) => {

    const r = code.split("$setGuildName[").length - 1
    const inside = code.split("$setGuildName[")[r].split("]")[0]

    let [Name, guildID] = inside.split(";")


    let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)
    if (!guild) return message.channel.send(`:x: Invalid guild ID in 2nd field of $setGuildName[${inside}].\n${docs.action}/setguildname`)

    if (!Name) return message.channel.send(`:x: Missing new guild name in 1st field of $setGuildName[${inside}].\n${docs.action}/setguildname`)

    let result;
    try {
        result = await guild.edit({ name: Name })
    } catch {
        return message.channel.send(`:x: Failed to change guild name in $setGuildName[${inside}]. Check bot/user permissions!\n${docs.action}/setguildname`)
    }

    result

    code = code.replaceLast(`$setGuildName[${inside}]`, "")

    return {
        code: code
    }
}
module.exports = setGuildName