const allNewsChannelsCount = (client, message, args, name, code) => {
  
    code = code.replaceLast(`$allNewsChannelsCount`, client.channels.cache.filter(ch => ch.type === "news").size)
    
    return {
      code:code 
    } 
  }
  
  module.exports = allNewsChannelsCount 