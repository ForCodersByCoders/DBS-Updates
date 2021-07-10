const fetchBans = async (client, message, args, name, code) => {
  
    let r = code.split("$fetchBans[").length - 1
    
    let inside = code.split("$fetchBans[")[r].split("]")[0]
    
    let fields = inside.split(";")
    
    let count = fields[0]
    
    if (!count) count = 0
    
    let sep = fields[1]
    
    if (!sep) sep = "\n"
    
    let check;
    
    if (count === 0) {
    let bans = await message.guild.fetchBans()
    
    check = bans.map(ban => `${ban.user.tag} - ${ban.reason}`).join(inside)
    }
    
    else {
      let bans = await message.guild.fetchBans()
    
    let temp = bans.map(ban => `${ban.user.tag} - ${ban.reason}`)
    
    check = temp.slice(0, count).join(sep)
    }
    
      code = code.replaceLast(`$fetchBans[${inside}]`, check)
  
  
      return {
          code: code
      }
  }
  
  module.exports = fetchBans;