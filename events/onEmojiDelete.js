const ms = require('parse-ms')
const moment = require("moment")

const interpret = require("discordbot-script/package/interpreter")

const edit = require('discordbot-script/package/bot/edit')

const Discord = require("discord.js")
const addreactions_ = require("discordbot-script/package/bot/addreactions")
const delete_ = require('discordbot-script/package/bot/delete')

const emojiDelete = async (client, emoji) => {

    client.emojiDelete.map(async command => {

        let message = {
            guild: emoji.guild,
            id: emoji,
            content: "",
            idd: Math.floor(Math.random() * 10101003949393),
            author: client.user
        }

        let created = moment(emoji.createdAt).format("LLLL");

        let timestamp = Object.entries(ms(Date.now() - emoji.createdTimestamp)).map((x, y) => {
            if (x[1] > 0 && y < 4) return `${x[1]} ${x[0]}`
        }).filter(x => x).join(", ")
        if (!timestamp) timestamp = undefined

        let commandCode = command.code.replace(/{id}/gm, emoji.id)
            .replace(/{name}/gm, emoji.name)
            .replace(/{url}/gm, emoji.url)
            .replace(/{isanimated}/gm, emoji.animated)
            .replace(/{guildid}/gm, emoji.guild.id)
            .replace(/{guildname}/gm, emoji.guild.name)
            .replace(/{created}/gm, created)
            .replace(/{timestamp}/gm, timestamp)



        let name = await interpret(client, message, message.content.split(" "), command.name, command.name)

        let channel = await client.channels.fetch(name).catch(err => { })

        if (!channel) return console.error(`Missing or incorrect channel: emojiDeleteCommand[${name}]`)

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

module.exports = emojiDelete;