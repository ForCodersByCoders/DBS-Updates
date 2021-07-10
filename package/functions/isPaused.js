const isPaused = (client, message, args, name, code) => {
let res;
    try {
        res = client.queue.get(message.guild.id).connection.dispatcher.paused.toString()

    } catch (error) {
        res = "false"
        if(!client.queue.get(message.guild.id)) res = "undefined"
    }

    code = code.replaceLast("$isPaused", res ? res : 'undefined')
      
    return {
      code: code,
    } 
  }
  
  module.exports = isPaused;