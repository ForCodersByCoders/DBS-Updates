const {docs} = require("../functions/docs/docs.json");

const sum = (client, message, args, name, code) => {
  
  let r = code.split("$sum[").length - 1
  
  let inside = code.split("$sum[")[r].split("]")[0]

  let fields = inside.split(";")

  if (fields.some(n => isNaN(Number(n)))) return message.channel.send(`:x: Invalid number in \`$sum[${inside}]\`.\n${docs.action}/sum`)

  let result = fields.reduce((x, y) => Number(x) + Number(y))

  code = code.replaceLast(`$sum[${inside}]`, result)
  
  return {
    code:code 
  } 
}

module.exports = sum;