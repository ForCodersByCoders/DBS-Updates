const moment = require("moment")
const interpret = require("discordbot-script/package/interpreter")
const edit = require('discordbot-script/package/bot/edit')
const Discord = require("discord.js")
const addreactions_ = require("discordbot-script/package/bot/addreactions")
const delete_ = require('discordbot-script/package/bot/delete')

const onReactionRemove = async (client, reaction, user) => {

    client.reactionRemove.map(async command => {

        // if (reaction.message.partial) await reaction.message.fetch();
        // if (reaction.partial) await reaction.fetch();

        guild = reaction.message.guild
        let member = { guild, user }

        let message = {
            guild: reaction.message.guild,
            id: reaction.message,
            channel: reaction.message.channel,
            content: "",
            idd: Math.floor(Math.random() * 10101003949393),
            author: user,
            member: member
        }

        let reacted = moment(reaction.createdAt).format("LLLL");

        // let reactionChannel = await message.channel.fetch(message.reactions)
        // let reactionMsg = await reactionChannel.messages.fetch(reaction.message)
        // let result;
        // let totalReactions = reactionMsg.map(msg => result = msg.reactions.cache.size)
        // totalReactions = result


        let commandCode = command.code.replace(/{reactions}/gm, reaction.count)
            // .replace(/{totalreactions}/gm, totalReactions)
            .replace(/{emoji}/gm, reaction.emoji.toString(reaction.emoji.id))
            .replace(/{emojiid}/gm, reaction.emoji.id)
            .replace(/{emojiname}/gm, reaction.emoji.name)
            .replace(/{didbotreact}/gm, reaction.me)
            .replace(/{messageurl}/gm, reaction.message.url)
            .replace(/{reactedat}/gm, reacted)
            .replace(/{identifier}/gm, reaction.emoji.identifier)
            .replace(/{channelid}/gm, message.channel.id)
            .replace(/{channelname}/gm, message.channel.name)
            .replace(/{channelmention}/gm, message.channel.toString())
            .replace(/{guildid}/gm, message.guild.id)
            .replace(/{guildname}/gm, message.guild.name)

        let name = await interpret(client, message, message.content.split(" "), command.name, command.name)

        let channel = await client.channels.fetch(name).catch(err => { })

        if (!channel) return console.error(`Missing or incorrect channel: ReactionRemoveCommand[${name}]`)

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

module.exports = onReactionRemove;