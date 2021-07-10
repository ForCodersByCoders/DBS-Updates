const {docs} = require("../functions/docs/docs.json");

const deleteEmojis = async (client, message, args, name, code) => {

    const r = code.split("$deleteEmojis[").length - 1

    const inside = code.split("$deleteEmojis[")[r].split("]")[0]

        for (const emoji of inside.split(";")) {
            const option = emoji.includes(":") ? emoji.split(":")[2].split(">")[0] : emoji 
            
            const EMOJI = message.guild.emojis.cache.get(option)
            
            if (!EMOJI) return message.channel.send(`❌ Invalid emoji in \`$deleteEmojis[${inside}]\`.\n${docs.action}/deleteemojis`)
                
            const eDel = await EMOJI.delete().catch(err => {})
            
            if (!eDel) return message.channel.send(`❌ Failed to delete ${EMOJI.name}!`)
        }

code = code.replaceLast(`$deleteEmojis[${inside}]`, "")

return {
        code: code
    } 

}
module.exports = deleteEmojis;