const interpret = require("../../package/interpreter.js")

const edit = require('../../package/bot/edit.js')
const addreactions_ = require("../../package/bot/addreactions.js")
const delete_ = require('../../package/bot/delete.js')

const Discord = require("discord.js")

const botLeave = async (client, guild) => {

    client.botLeave.map(async command => {

        let message = {
            guild: guild,
            content: "",
            idd: Math.floor(Math.random() * 10101003949393),
            author: client.user
        }

        let name = await interpret(client, message, message.content.split(" "), command.name, command.name)

        let channel = await client.channels.fetch(name).catch(err => { })

        if (!channel) return console.error(`Missing or incorrect channel: botLeaveCommand[${name}]`)

        client.embeds.set(message.idd, new Discord.MessageEmbed())

        let code = await interpret(client, message, message.content.split(" "), command.name, command.code)

        if (code) {
            let msg = channel.send(code, client.embeds.get(message.idd)).catch(err => { })

            edit(client, message, msg, client.editIn.get(message.idd))

            delete_(client, message, msg)

            addreactions_(client, message, msg)

            client.addReactions.delete(message.idd)

            client.suppress.delete(message.idd)

            client.embeds.delete(message.idd)
        }

    })
}

module.exports = botLeave;