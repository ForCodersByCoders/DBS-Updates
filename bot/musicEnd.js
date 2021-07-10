const interpret = require("discordbot-script/package/interpreter")

const edit = require('discordbot-script/package/bot/edit')

const Discord = require("discord.js")

const delete_ = require('discordbot-script/package/bot/delete')
const addreactions_ = require("discordbot-script/package/bot/addreactions")

const MusicEndCommand = async (client) => {
    client.musicEnd.map(async command => {

        let message = {
            idd: Math.floor(Math.random() * 10101003949393),
        }

        client.embeds.set(message.idd, new Discord.MessageEmbed())

        let name = await interpret(client, message, [], command.name, command.name)

        let channel = await client.channels.fetch(name).catch(err => { })

        if (!channel) return console.error(`Channel not found: MusicEndCommand[${name}]`)

        let code = await interpret(client, message, [], command.name, command.code)

        if (code) {
            let msg = channel.send(code, client.embeds.get(message.idd)).catch(err => { })

            edit(client, message, msg, client.editIn.get(message.idd))

            delete_(client, message, msg)

            addreactions_(client, message, msg)

            client.suppress.delete(message.idd)

            client.addReactions.delete(message.idd)

            client.embeds.delete(message.idd)
        }
    })
}

module.exports = MusicEndCommand