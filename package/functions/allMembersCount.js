const allMembersCount = (client, message, args, name, code) => {
  
  let users = 0
  
  client.guilds.cache.map(guild => users += guild.memberCount) 
  
  code = code.replaceLast(`$allMembersCount`, users)
  
  return {
    code:code 
  } 
}
module.exports = allMembersCount