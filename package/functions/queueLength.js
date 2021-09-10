const queueLength = (client, message, args, name, code) => {

    let items = client.queue.get(message.guild.id) || {songs:[]}

    code = code.replaceLast("$queueLength", items.songs.length.toString())
      
    return {
      code: code,
    } 
  }
  
  module.exports = queueLength;