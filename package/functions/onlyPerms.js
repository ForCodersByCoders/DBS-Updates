require("discordbot-script/package/Utils/permissions");
const execute = require("../../package/bot/executeCommand.js")

const embed = require("../../package/embed.js")

const onlyPerms = async (client, message, args, name, code) => {

    let r = code.split("$onlyPerms[").length - 1

    let inside = code.split("$onlyPerms[")[r].split(/]$/gm)[0]

    let fields = inside.split(";")

    let error = fields.pop()

   let array = []
  
  for(let i = 0; i < fields.length;i++) {
    if(perms[fields[i]] && !message.member.hasPermission([perms[fields[i]]])) {

array.push(perms[fields[i]])
        
    }
  }

  if(array.length) {

  if (error) {
    if (error.includes("{execute:")) {
        let m = await execute(client, message, args, error)
        error = m.error;
        if (!error) return undefined
        
      }
      error = embed(error)
    //   message.channel.send(error.error, error.embed)
        
        try {
         message.channel.send(error.error.replace(/{perms}/g, array.join(", ")), error.embed) 
        } catch(e) {
          console.log(e) 
        } 
      }
  }

  if(array.length) return;

  code = code.replaceLast(`$onlyPerms[${inside}]`, "")

  return {
      code: code
  }
}

module.exports = onlyPerms