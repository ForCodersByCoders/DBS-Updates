const {docs} = require("../functions/docs/docs.json");

const Discord = require("discord.js") 
const addTimestamp = (client, message, args, name, code) => {
  
  if (code.split("$addTimestamp").length >= 3) return message.channel.send(`:x: Can't use more than one \`$addTimestamp\`.\n${docs.embeds}/addtimestamp`)
  
  let embed = client.embeds.get(message.idd) 
    if (!embed) embed = new Discord.MessageEmbed()
  embed.setTimestamp()
  
  client.embeds.set(message.idd, embed)
  
  code = code.replace(`$addTimestamp`, "")
  
  return {
    code: code 
  } 
}

module.exports = addTimestamp;