const {docs} = require("../functions/docs/docs.json");

const loopSong = (client, message, args, name, code) => {
    
    const r = code.split("$loopSong[").length - 1
    
    let inside = code.split("$loopSong[")[r].split("]")[0]

    if(!['yes','no'].includes(inside.toLowerCase())) return message.channel.send(`:x: Invalid option in $loopSong[${inside}]\n${docs.music}/loopsong`)
    switch(inside){
        case "yes": {
           let lop = client.queue.get(message.guild.id)
           lop.loop = true
           client.queue.set(message.guild.id, lop)
        }
        break;
        case "no": {
            let lop = client.queue.get(message.guild.id)
            lop.loop = false
            client.queue.set(message.guild.id, lop)
         }
    }
    
    code = code.replaceLast(`$loopSong[${inside}]`, "")
    
    return {
        code: code
    }
}
module.exports = loopSong;