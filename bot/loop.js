const db = require('quick.db')

const edit = require('./edit.js')

const delete_ = require("./delete.js")

const embed = require('../../package/embed.js')

const interpret = require('../../package/interpreter.js')

const Discord = require('discord.js')

const loop = (client, ops, time) => {

    let command = ops

    let message = {
        idd: Math.floor(Math.random() * 43389986202),
        content: "",
    }

    setInterval(async () => {
        let code = await interpret(client, message, message.content.split(" "), command.name, command.code)

        if (code) { 

            let channel = client.channel.get(message.idd)

            if (!channel) return;

            const msg = await require("./attachment.js")(client, message, channel, code)

            edit(client, message, msg, client.editIn.get(message.idd)) 

            client.suppress.delete(message.idd) 
            
            delete_(client, message, msg)
        } 
    }, time);
}

module.exports = loop