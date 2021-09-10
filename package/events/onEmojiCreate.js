const ms = require('parse-ms')
const moment = require("moment")

const interpret = require("discordbot-script/package/interpreter")

const edit = require('discordbot-script/package/bot/edit')

const Discord = require("discord.js")
const addreactions_ = require("discordbot-script/package/bot/addreactions")
const delete_ = require('discordbot-script/package/bot/delete')

const emojiCreate = async (client, emoji) => {

    client.emojiCreate.map(async command => {

        let message = {
            guild: emoji.guild,
            id: emoji.guild.id,
            content: emoji.name,
            idd: Math.floor(Math.random() * 10101003949393),
            author: client.user
        }

        let created = moment(emoji.createdAt).format("LLLL");

        let commandCode = command.code.replace(/{id}/gm, emoji.id)
            .replace(/{name}/gm, emoji.name)
            .replace(/{url}/gm, emoji.url)
            .replace(/{emoji}/gm, emoji)
            .replace(/{isanimated}/gm, emoji.animated)
            .replace(/{guildid}/gm, emoji.guild.id)
            .replace(/{guildname}/gm, emoji.guild.name)
            .replace(/{created}/gm, created)


        let name = await interpret(client, message, message.content.split(" "), command.name, command.name)

        let channel = await client.channels.fetch(name).catch(err => { })

        if (!channel) return console.error(`Missing or incorrect channel: emojiCreateCommand[${name}]`)

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

module.exports = emojiCreate;