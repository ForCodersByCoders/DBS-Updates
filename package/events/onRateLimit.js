const ms = require("parse-ms")
const moment = require("moment")

const interpret = require("discordbot-script/package/interpreter")

const edit = require('discordbot-script/package/bot/edit')

const Discord = require("discord.js")
const addreactions_ = require("discordbot-script/package/bot/addreactions")
const delete_ = require('discordbot-script/package/bot/delete')

const rateLimit = async (client, rateLimitInfo) => {

    client.rateLimit.map(async command => {

        let message = {
            guild: Math.floor(Math.random() * 10101003949393),
            // id: client.guilds.cache,
            // channel: client.channels.cache,
            content: "",
            idd: Math.floor(Math.random() * 10101003949393),
            author: client.user
        }

        let timeoutfor = Object.entries(ms(rateLimitInfo.timeout)).map((x, y) => {
            if (x[1] > 0 && y < 4) return `${x[1]} ${x[0]}`
        }).filter(x => x).join(", ")
        if (!timeoutfor) timeoutfor = undefined

        let timeoutuntil = moment(Date.now() - rateLimitInfo.timeout).format("LLLL");

        let commandCode = command.code.replace(/{for}/gm, timeoutfor)
            .replace(/{until}/gm, timeoutuntil)
            .replace(/{limit}/gm, rateLimitInfo.limit)
            .replace(/{method}/gm, rateLimitInfo.method)
            .replace(/{where}/gm, rateLimitInfo.path)
            .replace(/{route}/gm, rateLimitInfo.route)


        let name = await interpret(client, message, message.content.split(" "), command.name, command.name)

        let channel = await client.channels.fetch(name).catch(err => { })

        if (!channel) return console.error(`Missing or incorrect channel: RateLimitCommand[${name}]`)

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

module.exports = rateLimit;