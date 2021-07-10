const db = require('quick.db')

const setChannelVar = async (client, message, args, name, code) => {
  
  let r = code.split("$setChannelVar[").length - 1
  
  let inside = code.split("$setChannelVar[")[r].split("]")[0]
  
  let [variable, value, id] = inside.split(";")
  
  if (!id) id = message.channel.id
  
  await db.set(`${variable}_${id}`, value) 
  
  code = code.replaceLast(`$setChannelVar[${inside}]`, "")
  
  return {
    code:code 
  } 
}

module.exports = setChannelVar