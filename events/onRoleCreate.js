const moment = require("moment")

const interpret = require("discordbot-script/package/interpreter")

const edit = require('discordbot-script/package/bot/edit')

const Discord = require("discord.js")
const addreactions_ = require("discordbot-script/package/bot/addreactions")
const delete_ = require('discordbot-script/package/bot/delete')

const roleCreate = async (client, role) => {

    client.roleCreate.map(async command => {

        let message = {
            guild: role.guild,
            id: role,
            content: "",
            idd: Math.floor(Math.random() * 10101003949393),
            author: client.user
        }

        let created = moment(role.createdAt).format("LLLL");

        let commandCode = command.code.replace(/{id}/gm, role.id)
            .replace(/{mention}/gm, role.toString(role.id))
            .replace(/{name}/gm, role.name)
            .replace(/{ishoisted}/gm, role.hoist)
            .replace(/{ismentionable}/gm, role.mentionable)
            .replace(/{color}/gm, role.hexColor)
            .replace(/{guildid}/gm, role.guild.id)
            .replace(/{guildname}/gm, role.guild.name)
            .replace(/{created}/gm, created)
            .replace(/{position}/gm, role.position)


        let name = await interpret(client, message, message.content.split(" "), command.name, command.name)

        let channel = await client.channels.fetch(name).catch(err => { })

        if (!channel) return console.error(`Missing or incorrect channel: roleCreateCommand[${name}]`)

        client.embeds.set(message.idds, new Discord.MessageEmbed())

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

module.exports = roleCreate;