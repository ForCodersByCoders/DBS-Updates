const {docs} = require("../functions/docs/docs.json");

const loopQueue = (client, message, args, name, code) => {
    
    const r = code.split("$loopQueue[").length - 1
    
    let inside = code.split("$loopQueue[")[r].split("]")[0]

    if(!['yes','no'].includes(inside)) return message.channel.send(`:x: Invalid option in $loopQueue[${inside}].\n${docs.music}/loopqueue`)
    switch(inside){
        case "yes": {
           let lop = client.queue.get(message.guild.id)
           lop.queueLoop = true
           client.queue.set(message.guild.id,lop)
        }
        break;
        case "no": {
            let lop = client.queue.get(message.guild.id)
            lop.queueLoop = false
            client.queue.set(message.guild.id,lop)
         }
    }
    
    code = code.replaceLast(`$loopQueue[${inside}]`, "")
    
    return {
        code: code
    }
}
module.exports = loopQueue;