const {docs} = require("../functions/docs/docs.json");

const Discord = require("discord.js") 
const author = (client, message, args, name, code) => {
  
  if (code.split("$author[").length >= 3) return message.channel.send(`❌ Can't use more than one \`$author\`.\n${docs.embeds}/author`)
  
  let inside = code.split("$author[")[1].split(/]$/gm)[0]
  
  let [title, url] = inside.split(";")

  if (!url) url = message.author.displayAvatarURL

  let embed = client.embeds.get(message.idd) 
    if (!embed) embed = new Discord.MessageEmbed()
  embed.setAuthor(title, url)
  
  client.embeds.set(message.idd, embed)
  
  code = code.replace(`$author[${inside}]`, "")
  
  return {
    code: code 
  } 
}

module.exports = author