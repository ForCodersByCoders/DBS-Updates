const db = require('quick.db')
const {docs} = require("../functions/docs/docs.json");

const getMessageVar = async (client, message, args, name, code) => {
  
  let r = code.split("$getMessageVar[").length - 1
  
  let inside = code.split("$getMessageVar[")[r].split("]")[0]
  
  let [variable, id = message.id] = inside.split(";")
  
  let err = client.suppress.get(message.idd)
  
  if (client.vars[variable] === undefined && err === undefined) return message.channel.send(`❌ Variable \`${variable}\` not found in command name: ${name}!\n${docs.variables}/getmessagevar`)
  else if (client.vars[variable] === undefined && err !== undefined) return message.channel.send(err).catch(err => {})
  
  let item = await db.fetch(`${variable}_${message.guild.id}_${id}`)

  if (item === null) {
    item = client.vars[variable]
    db.set(`${variable}_${message.guild.id}_${id}`, client.vars[variable]) 
  } 
  
  code = code.replaceLast(`$getMessageVar[${inside}]`, item)
  
  return {
    code:code 
  } 
}

module.exports = getMessageVar 