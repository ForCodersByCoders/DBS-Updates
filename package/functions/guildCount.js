const guildCount = (client, message, args, name, code) => {
  
  code = code.replaceLast(`$guildCount`, client.guilds.cache.size)
  
  return {
    code:code 
  } 
}

module.exports = guildCount 