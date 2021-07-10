const Discord = require("discord.js") 
const addField = async (client, message, args, name, code) => {
  
  let r = code.split("$addField[").length - 1
  
  let inside = code.split("$addField[")[r].split(/]$/gm)[0]
  let field = inside.split(";")
  let [head, desc, line] = inside.split(";")


 if (field[1].includes("{hyper:")) {
    field[1].split("{hyper:").map(x => {
      if (!field[1].includes("{hyper:")) return 
      let ins = field[1].split("{hyper:")[1].split("}")[0] 
      let text = ins.split(":")[0]
      let url = ins.split(":").slice(1).join(":") 
      field[1] = field[1].replace(`{hyper:${ins}}`, `[${text}](${url})`)
    }) 
  }
    

  let embed = client.embeds.get(message.idd) 
  
    if (!embed) embed = new Discord.MessageEmbed()
    if(line && line.trim().toLowerCase() === "yes") {
  embed.addField(field[0], field[1], true)
    } else {
      embed.addField(field[0], field[1])
    }
  
  client.embeds.set(message.idd, embed)
  
  code = code.replaceLast(`$addField[${inside}]`, "")
  
  return {
    code: code 
  } 
}

module.exports = addField;