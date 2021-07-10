const {docs} = require("../functions/docs/docs.json");

const getArg = async (client, message, args, name, code) => {
  
    let r = code.split("$getArg[").length - 1
    
    let inside = code.split("$getArg[")[r].split("]")[0]
    
    let [
        text = message.content,
        number
    ] = inside.split(";")
    
    // if (!text) return message.channel.send(`:x: Missing text in 1st field of \`$getArg[${inside}]\`.`)
    
    if (!number) return message.channel.send(`:x: Missing number in 2nd field of \`$getArg[${inside}]\`.\n${docs.data}/getarg`)
    
    if (isNaN(number)) return message.channel.send(`:x: Invalid number given in 2nd field of \`$getArg[${inside}]\`.\n${docs.data}/getarg.`)
    
    let num = parseInt(number)// - 1
    
    let textsplit = text.split(" ")
    
    let result = textsplit[num]
  
      code = code.replaceLast(`$getArg[${inside}]`, result)
  
      return {
          code: code
      }
  }
  
  module.exports = getArg;