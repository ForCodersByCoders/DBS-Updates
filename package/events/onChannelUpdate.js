const Discord = require("discord.js")
const edit = require('discordbot-script/package/bot/edit')
const delete_ = require('discordbot-script/package/bot/delete')
const interpret = require("discordbot-script/package/interpreter")
const addreactions_ = require("discordbot-script/package/bot/addreactions")

const channelUpdate = async (client, oldChannel, newChannel) => {

    client.channelUpdate.map(async command => {

        let message = {
            guild: newChannel.guild,
            content: "",
            idd: Math.floor(Math.random() * 10101003949393),
            author: newChannel
        }

        let commandCode = command.code.replace(/{oldname}/gm, oldChannel.name).replace(/{newname}/gm, newChannel.name)
            .replace(/{oldtopic}/gm, oldChannel.topic).replace(/{newtopic}/gm, newChannel.topic)
            .replace(/{oldtype}/gm, oldChannel.type).replace(/{newtype}/gm, newChannel.type)
            .replace(/{oldposition}/gm, oldChannel.rawPosition).replace(/{newposition}/gm, newChannel.rawPosition)
            .replace(/{oldparentid}/gm, oldChannel.parent.id).replace(/{newparentid}/gm, newChannel.parent.id)

            .split(/{id}/gm).join(newChannel.id)
            .replace(/{mention}/gm, newChannel.toString(newChannel.id))
            .split(/{guildid}/gm).join(newChannel.guild.id)

        let name = await interpret(client, message, message.content.split(" "), command.name, command.name)

        let channel = await client.channels.fetch(name).catch(err => { })

        if (!channel) return console.error(`Missing or incorrect channel: ChannelUpdateCommand[${name}]`)

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

module.exports = channelUpdate;