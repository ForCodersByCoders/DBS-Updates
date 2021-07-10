const {docs} = require("../functions/docs/docs.json");

const roundDown = (client, message, args, name, code) => {
  
  let r = code.split("$roundDown[").length - 1
  
  let inside = code.split("$roundDown[")[r].split("]")[0]

  if (isNaN(Number(inside))) return message.channel.send(`:x: Invalid number in \`$roundDown[${inside}]\`.\n${docs.action}/rounddown`)

  let result = Math.floor(inside)

  code = code.replaceLast(`$roundDown[${inside}]`, result)
  
  return {
    code:code 
  } 
}

module.exports = roundDown;