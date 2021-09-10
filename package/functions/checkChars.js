const {docs} = require("../functions/docs/docs.json");

const checkChars = async (client, message, args, name, code) => {

    const r = code.split("$checkChars[").length - 1
  
    let inside = code.split("$checkChars[")[r].split("]")[0]
  
    let fields = inside.split(";")
  
    let content = fields[0]
    let matches = fields.slice(1);
    let contains = matches.some(match => content.includes(match));

    if(!content) return message.channel.send(`:x: Missing content in 1st field of \`$checkChars[${inside}]\`.\n${docs.data}/checkchars`)
    if(!matches) return message.channel.send(`:x: Missing content to match with, **after** the 1st field \`$checkChars[${inside}]\`.\n${docs.data}/checkchars`)

    code = code.replaceLast(`$checkChars[${inside}]`, contains)
  
    return {
        code: code
    }
  }
  
  
  module.exports = checkChars;