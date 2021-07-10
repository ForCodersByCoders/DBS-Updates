const embed = require('../../package/embed.js')

const edit = (client, message, msg, obj) => {
  
  if (!obj) return
  
  client.editIn.delete(message.idd)

  const interval = setInterval(() => {
    if (!obj.msg.length) return clearInterval(interval)
    
    let e = embed(obj.msg[0])

    obj.msg.shift()

  	msg.edit(e.error, e.embed) 
   
  }, obj.time) 
}

module.exports = edit;