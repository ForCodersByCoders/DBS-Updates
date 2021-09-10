const {docs} = require("../functions/docs/docs.json");

const random = (client, message, args, name, code) => {
  
  if (!code.includes("$random[")) return {code:code}
  
  let r = code.split("$random[").length - 1
  
  let inside = code.split("$random[")[r].split("]")[0]
  
  let [min, max] = inside.split(";")
  
  let err = client.suppress.get(message.idd)

  if (isNaN(min) || isNaN(max) && err === undefined) return message.channel.send(`❌ Invalid number in \`$random[${inside}]\`.\n${docs.data}/random`)
  else if (isNaN(min) || isNaN(max) && err !== undefined) return message.channel.send(err).catch(err => {})

  if (Number(min) >= Number(max) && err === undefined) return message.channel.send(`❌ 1st field must be a lower number than the 2nd field in \`$random[${inside}]\`.\n${docs.data}/random`)
  else if (Number(min) >= Number(max) && err !== undefined) return message.channel.send(err).catch(err => {})

  let n = Math.floor(Math.random() * (Number(max) - Number(min))) + Number(min)
  
  code = code.split(`$random[${inside}]`).join(n)
  
  return {
    code:code 
  } 
}


module.exports = random 