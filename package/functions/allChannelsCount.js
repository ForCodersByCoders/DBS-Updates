const allChannelsCount = (client, message, args, name, code) => {
  
    code = code.replaceLast(`$allChannelsCount`, client.channels.cache.size)
    
    return {
      code:code 
    } 
  }
  
  module.exports = allChannelsCount 