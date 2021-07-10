const {docs} = require("../functions/docs/docs.json");

const volume = async (client, message, args, name, code) => {

    let r = code.split("$volume[").length - 1

    let inside = code.split("$volume[")[r].split("]")[0]

    let dispatcher = client.queue.get(message.guild.id).connection.dispatcher

    if(isNaN(inside)) return message.channel.send(`:x: Volume is not a valid number!\n${docs.music}/volume`)

    dispatcher.setVolume(inside / 100)

    code = code.replaceLast(`$volume[${inside}]`, "")
        
    return {
        code: code,
    } 
}

module.exports = volume;