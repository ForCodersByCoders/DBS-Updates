const interpret = require("discordbot-script/package/interpreter")

const edit = require('discordbot-script/package/bot/edit')

const Discord = require("discord.js")
const addreactions_ = require("discordbot-script/package/bot/addreactions")
const delete_ = require('discordbot-script/package/bot/delete')

const ErrorCommand = async (client, error) => {

    client.error.map(async command => {

        let message = {
            guild: error.channel.guild,
            // id: client.guilds.cache,
            // channel: client.channels.cache,
            content: "",
            idd: Math.floor(Math.random() * 10101003949393),
            author: client.user
        }


        let commandCode = command.code.replace(/{error}/gm, error.name)
            .replace(/{message}/gm, error.message)
            .replace(/{file}/gm, error.fileName)
            .replace(/{line}/gm, error.lineNumber)


        let name = await interpret(client, message, message.content.split(" "), command.name, command.name)

        let channel = await client.channels.fetch(name).catch(err => { })

        if (!channel) return console.error(`Missing or incorrect channel: ErrorCommand[${name}]`)

        client.embeds.set(message.idd, new Discord.MessageEmbed())

        let code = await interpret(client, message, message.content.split(" "), command.name, commandCode)

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

module.exports = ErrorCommand;