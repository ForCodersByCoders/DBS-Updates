const Discord = require("discord.js")
const edit = require('discordbot-script/package/bot/edit')
const delete_ = require('discordbot-script/package/bot/delete')
const interpret = require("discordbot-script/package/interpreter")
const addreactions_ = require("discordbot-script/package/bot/addreactions")

const userUpdate = async (client, oldUser, newUser) => {

    client.userUpdate.map(async command => {

        let message = {
            guild: newUser.guild,
            content: "",
            idd: Math.floor(Math.random() * 10101003949393),
            author: newUser
        }

        let commandCode = command.code.replace(/{oldname}/gm, oldUser.username).replace(/{newname}/gm, newUser.username)
            .replace(/{oldavatar}/gm, oldUser.avatarURL()).replace(/{newavatar}/gm, newUser.avatarURL())
            .replace(/{olddiscrim}/gm, oldUser.discriminator).replace(/{newdiscrim}/gm, newUser.discriminator)
            .replace(/{tag}/gm, newUser.tag)
            .replace(/{isbot}/gm, newUser.bot)
            .replace(/{id}/gm, newUser.id)
            .replace(/{mention}/gm, newUser.toString(newUser.id))

        let name = await interpret(client, message, message.content.split(" "), command.name, command.name)

        let channel = await client.channels.fetch(name).catch(err => { })

        if (!channel) return console.error(`Missing or incorrect channel: UserUpdateCommand[${name}]`)

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

module.exports = userUpdate;