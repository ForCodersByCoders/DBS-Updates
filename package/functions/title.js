const Discord = require("discord.js") 
const {docs} = require("../functions/docs/docs.json");

const title = (client, message, args, name, code) => {
  
  if (code.split("$title[").length >= 3) return message.channel.send(`❌ Can't use more than one $title.\n${docs.embeds}/title`)
  
  let inside = code.split("$title[")[1].split(/]$/gm)[0]
  
  let [title, url] = inside.split(';');

  let embed = client.embeds.get(message.idd) 
    if (!embed) embed = new Discord.MessageEmbed()
  embed.setTitle(title)
  client.embeds.set(message.idd, embed)


  embed.setURL(url)

  
  code = code.replace(`$title[${inside}]`, " ")
  
  return {
    code: code 
  } 
}

module.exports = title;