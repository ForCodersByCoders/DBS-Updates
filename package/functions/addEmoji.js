const {docs} = require("../functions/docs/docs.json");

const addEmoji = async (client, message, args, name, code) => {

    const r = code.split("$addEmoji[").length - 1

    const inside = code.split("$addEmoji[")[r].split("]")[0]

    const options = [
        url, 
        name,
        returnEmoji = "no",
        ...roleIDs
    ] = inside.split(";")

    const emoji = await message.guild.emojis.create(url, name, roleIDs.length ? {
        roles: roleIDs
    } : undefined).catch(err => {})

    if(!emoji) return message.channel.send(`:x: Failed to create emoji!\n\`url:\` ${url}\n\`name:\` ${name}\n${docs.action}/addemoji`)
    
code = code.replaceLast(`$addEmoji[${inside}]`, returnEmoji === "yes" ? emoji.toString() : "")

return {
        code: code
    } 

}
module.exports = addEmoji;