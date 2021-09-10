const {docs} = require("../functions/docs/docs.json");

const power = (client, message, args, name, code) => {
  
  let r = code.split("$power[").length - 1
  
  let inside = code.split("$power[")[r].split("]")[0]

  let [number, powerOf] = inside.split(";");

  if (isNaN(Number(number))) return message.channel.send(`:x: Invalid number in 1st field of \`$power[${inside}]\`.\n${docs.action}/power`)
  if (isNaN(Number(powerOf))) return message.channel.send(`:x: Invalid number in 2nd field of \`$power[${inside}]\`.\n${docs.action}/power`)

  let result = Math.pow(number, powerOf)

  code = code.replaceLast(`$power[${inside}]`, result)
  
  return {
    code:code 
  } 
}

module.exports = power;