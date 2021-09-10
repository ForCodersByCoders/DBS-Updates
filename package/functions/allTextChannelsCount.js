const allTextChannelsCount = (client, message, args, name, code) => {
  
    code = code.replaceLast(`$allTextChannelsCount`, client.channels.cache.filter(ch => ch.type === "text").size)
    
    return {
      code:code 
    } 
  }
  
  module.exports = allTextChannelsCount 