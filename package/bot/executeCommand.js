const db = require('quick.db')
const edit = require('./edit.js')
const delete_ = require("./delete.js")
const embed = require('../../package/embed.js')
const interpret = require('../../package/interpreter.js')
const Discord = require('discord.js')

const execute = async (client, message, args, error, name) => {
  
  
    if (!error.includes("{execute:")) return { error: error }

    let x = error.split("{execute:")[1].split("}")[0]

    let command = client.executableCommands.get(x)

    if (!command) return message.channel.send(`:x: Invalid executable command: \`${x}\`.`)

    client.embeds.set(message.idd, new Discord.MessageEmbed())
  
    error = error.replaceLast(`{execute:${x}}`, "")

    let execute = await interpret(client, message, args, command.name, command.code)
  
    if (execute !== undefined) {  

        let channel = client.channel.get(message.idd)

        if (!channel) channel = message.channel

  const msg = await require("./attachment.js")(client, message, channel, execute)


        client.channel.delete(message.idd)

        edit(client, message, msg, client.editIn.get(message.idd))

        delete_(client, message, msg)

        client.embeds.delete(message.idd)

        client.suppress.delete(message.idd)
  }

  return {
      error: error
  }
}

module.exports = execute;