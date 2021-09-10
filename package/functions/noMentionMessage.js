const {docs} = require("../functions/docs/docs.json");

const noMentionMessage = async (client, message, args, name, code, channel) => {

    const r = code.split("$noMentionMessage").length - 1

    if (code.split("$noMentionMessage")[r].startsWith("[")) {

        let inside = code.split("$noMentionMessage[")[r].split("]")[0]
        
        args = args.filter(arg => ["<@", "<@!","<@&","<#"].some(x => !arg.startsWith(x)) && !arg.endsWith(">"))
  
  if (!inside) {
    code = code.replaceLast(`$noMentionMessage[]`, args.join(" ")) 
  } else {
    if (isNaN(inside) || Number(inside) < 1) return message.channel.send(`❌ Invalid arg number in \`$noMentionMessage[${inside}]\`.\n${docs.data}/nomentionmessage`)
    
    let n = args[Number(inside) - 1] || ""
      
        code = code.replaceLast(`$noMentionMessage[${inside}]`, n)
  }

        return {
            code: code,
        }
    } else {

        args = args.filter(arg => ["<@", "<@!","<@&","<#"].some(x => !arg.startsWith(x)) && !arg.endsWith(">"))

        code = code.replaceLast("$noMentionMessage", args.join(" "))
    
        return {
            code: code
        }
    }
}
module.exports = noMentionMessage;