const allVoiceChannelsCount = (client, message, args, name, code) => {
  
    code = code.replaceLast(`$allVoiceChannelsCount`, client.channels.cache.filter(ch => ch.type === "voice").size)
    
    return {
      code:code 
    } 
  }
  
  module.exports = allVoiceChannelsCount 