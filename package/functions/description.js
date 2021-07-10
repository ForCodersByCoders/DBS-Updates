const Discord = require("discord.js") 
const {docs} = require("../functions/docs/docs.json");

const description = (client, message, args, name, code) => {
  
  if (code.split("$description[").length >= 3) return message.channel.send(`❌ Can't use more than one $description.\n${docs.embeds}/description`)
  
  let inside = code.split("$description[")[1].split(/]$/gm)[0]
  
  if (inside.includes("{hyper:")) {
    inside.split("{hyper:").map(x => {
      if (!inside.includes("{hyper:")) return 
      let ins = inside.split("{hyper:")[1].split("}")[0] 
      let text = ins.split(":")[0]
      let url = ins.split(":").slice(1).join(":") 
      inside = inside.replace(`{hyper:${ins}}`, `[${text}](${url})`) 
      code = code.replace(`{hyper:${ins}}`, `[${text}](${url})`) 
    }) 
  }
    

  let embed = client.embeds.get(message.idd) 
  if (!embed) embed = new Discord.MessageEmbed()
  
  embed.setDescription(inside)
  
  client.embeds.set(message.idd, embed)
  
  code = code.replace(`$description[${inside}]`, "")
    return {
    code: code 
  } 
  
}
module.exports = description 