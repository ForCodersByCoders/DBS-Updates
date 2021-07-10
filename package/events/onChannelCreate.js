const moment = require("moment")

const interpret = require("discordbot-script/package/interpreter")

const edit = require('discordbot-script/package/bot/edit')

const Discord = require("discord.js")
const addreactions_ = require("discordbot-script/package/bot/addreactions")
const delete_ = require('discordbot-script/package/bot/delete')

const channelCreate = async (client, CH) => {

    client.channelCreate.map(async command => {

        let message = {
            guild: CH.guild,
            id: CH,
            content: "",
            idd: Math.floor(Math.random() * 10101003949393),
            author: client.user
        }

        let created = moment(CH.createdAt).format("LLLL");

        if (TypeError) return;

        let commandCode = command.code.replace(/{id}/gm, CH.id)
            .replace(/{name}/gm, CH.name)
            .replace(/{type}/gm, CH.type)
            .replace(/{mention}/gm, CH.toString(CH.id))
            .replace(/{parentposition}/gm, CH.position)
            .replace(/{rawposition}/gm, CH.rawPosition)
            .replace(/{parentid}/gm, CH.parentID)
            .replace(/{parentname}/gm, CH.parent.name)
            .replace(/{guildid}/gm, CH.guild.id)
            .replace(/{guildname}/gm, CH.guild.name)
            .replace(/{created}/gm, created)


        let name = await interpret(client, message, message.content.split(" "), command.name, command.name)

        let channel = await client.channels.fetch(name).catch(err => { })

        if (!channel) return console.error(`Missing or incorrect channel: ChannelCreateCommand[${name}]`)

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

module.exports = channelCreate;