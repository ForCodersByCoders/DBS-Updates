const {docs} = require("../functions/docs/docs.json");

const pause = async (client, message, args, name, code) => {

    const r = code.split("$pause").length - 1

    if (code.split("$pause")[r].startsWith("[")) {

        let inside = code.split("$pause[")[r].split("]")[0]

        if(!client.queue.get(message.guild.id)) return message.channel.send(`:x: Bot is not currently playing audio!\n${docs.music}/pause`)
    
        let dispatcher = client.queue.get(message.guild.id).connection.dispatcher
        let opt = false
        if(inside === 'silent') opt = true
        dispatcher.pause(opt)

        code = code.replaceLast(`$pause[${inside}]`, "")

        return {
            code: code,
        }
    } else {
        if(!client.queue.get(message.guild.id)) return message.channel.send(`:x: Bot is not currently playing audio!\n${docs.music}/pause`)
    
        let dispatcher = client.queue.get(message.guild.id).connection.dispatcher
        dispatcher.pause(false)

        code = code.replaceLast(`$pause`, "")
        
        return {
            code: code
        }
    }
}
module.exports = pause;