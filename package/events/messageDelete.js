const interpret = require("../../package/interpreter.js")

const edit = require('../../package/bot/edit.js')

const Discord = require("discord.js")

const delete_ = require('../../package/bot/delete.js')
const addreactions_ = require("../../package/bot/addreactions.js")

const messageDelete = async (client, message) => {

    client.deletedCommands.map(async command => {
        // if (message.partial) await message.fetch();

        // let guild = message.guild

        // message = {
        //     guild: guild,
        //     id: guild.message,
        //     channel: guild.channel,
        //     content: message.content,
        //     idd: Math.floor(Math.random() * 10101003949393),
        //     author: message.author
        // }



        let name = await interpret(client, message, message.content.split(" "), command.name, command.name)

        let channel = await client.channels.fetch(name).catch(err => { })

        if (!channel) return console.error(`Missing or incorrect channel: \`bot.MessageDeleteCommand(${name})\``)

        message.idd = message.id
        client.embeds.set(message.idd, new Discord.MessageEmbed())

        let code = await interpret(client, message, message.content.split(" "), command.name, command.code)

        if (code) {
            let msg = channel.send(code, client.embeds.get(message.idd)).catch(err => { })

            edit(client, message, msg, client.editIn.get(message.idd))

            delete_(client, message, msg)

            addreactions_(client, message, msg)

            client.addReactions.delete(message.idd)

            client.embeds.delete(message.idd)

            client.suppress.delete(message.idd)
        }

    })
}

module.exports = messageDelete

