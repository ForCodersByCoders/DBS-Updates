const ms = require('ms');
const {docs} = require("../functions/docs/docs.json");
const embed = require('discordbot-script/package/embed');

const editIn = (client, message, args, name, code) => {
  
  if (code.split("$editIn[").length >= 3) return message.channel.send(`❌ Can't use more than one $editIn.\n${docs.action}/editin`)
  
  let inside = code.split("$editIn[")[1].split("]")[0]
  
  let fields = inside.split(";")

  let time = fields.shift()

  let msgs = fields
  
  if (isNaN(time)) time = ms(time)
  else time = Number(time)
  
  client.editIn.set(message.idd, {
    time:time,
    msg:msgs
  }) 
  
  code = code.replaceLast(`$editIn[${inside}]`, "")
  
  return {
    code:code 
  } 
  
}
module.exports = editIn 