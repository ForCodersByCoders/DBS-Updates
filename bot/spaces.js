const db = require('quick.db')

const edit = require('./edit.js')

const delete_ = require("./delete.js")

const embed = require('../../package/embed.js')

const interpret = require('../../package/interpreter.js')

const Discord = require('discord.js')

const event = (client, message, args, prefix) => {
  
  client.spaceCommands.map(async command => {
    
    message.idd = Math.floor(Math.random() * 439034930259) 

    client.embeds.set(message.idd, new Discord.MessageEmbed())
    
    let code = await interpret(client, message, message.content.split(" "), command.name, command.code)
    
    if (code) { 

      let channel = client.channel.get(message.idd) || message.channel

     
  const msg = await require("./attachment.js")(client, message, channel, code)

      edit(client, message, msg, client.editIn.get(message.idd)) 

      delete_(client, message, msg)

      client.embeds.delete(message.idd)

      client.suppress.delete(message.idd)
    } 
  }) 
}

module.exports = event;