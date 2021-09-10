const interpret = require('../../package/interpreter.js')

const edit = require('../../package/bot/edit.js')

const delete_ = require('../../package/bot/delete.js')
const { MessageAttachment } = require("discord.js")
const db = require("quick.db")

const spaces = require('../../package/bot/spaces.js')

const addreactions_ = require("../../package/bot/addreactions.js")

const Discord = require('discord.js')

const event = async (client, message, prefix) => {


    client.embed = new Discord.MessageEmbed()

    let users = await db.fetch("blackListUsers_0") || []

    let servers = await db.fetch("blackListServers_0") || []

    if (message.channel.type === "text" && servers.includes(message.guild.id)) return

    if (users.includes(message.author.id)) return

    if (message.author.bot) return

    if (message.channel.type === "dm") return

    spaces(client, message, [], prefix)

    prefix.map(async p => {

        if (p.includes("$getServerVar")) {

            p = await interpret(client, message, [], "Space Command", p)
        }

        if (message.content.startsWith(p)) prefix = p
    })

    await new Promise(resolve => setTimeout(resolve, 10))

    if (typeof prefix === "object") return

    let args = message.content.slice(prefix.length).trim().split(/ +/g)

    let cmd = args.shift().toLowerCase()

    let customCmds = await db.fetch(`customCommands_${message.guild.id}`) || []

    let command = client.commands.get(cmd) || client.commands.find(x => x.aliases && x.aliases.includes(cmd))

    try {
        if (command.status === "enabled") command.status = false
        if (command.status === "disabled") {
            if (!command.error || command.error === ("" || " " || "  " || "   " || "    " || "     ")) return;
            else if (command.status === "disabled" && command.error) return message.channel.send(`${command.error}`);
        }

    } catch {
    }

    if (!command) command = customCmds.find(c => c.name.toLowerCase() === cmd)

    if (!command) return // console.log("error!")


    message.idd = message.id

    client.embeds.set(message.idd, new Discord.MessageEmbed())

    command.code.forEach(async (code) => {
        let execute = await interpret(client, message, args, command.name, code, command.api)



        if (execute !== undefined) {

            let channel = client.channel.get(message.idd)

            if (!channel) channel = message.channel;

            const msg = await require("../bot/attachment.js")(client, message, channel, execute)


            //---------

            if (client.awaitReactions.get(message.idd)) {


                let muss = await require("../functions/awaitCmdReactions.js")(client, msg, args, command.name, client.awaitReactions.get(message.idd), []);


                client.awaitReactions.delete(message.idd, muss)

            }

            //-----------


            // process.on(client.error, error => {
            //     if (client.consoleSuppress === 'true') {
            //         if (client.consoleReturn === 'true') {
            //             message.channel.send('Error Occured: ' + error)
            //         }
            //         else return;
            //     }
            //     else {
            //         console.error(error)
            //     }
            // })


            client.channel.delete(message.idd)

            edit(client, message, msg, client.editIn.get(message.idd))

            delete_(client, message, msg)

            addreactions_(client, message, msg)

            client.addReactions.delete(message.idd)

            client.embeds.delete(message.idd)

            client.suppress.delete(message.idd)
        }

        client.options.disableMentions = "none";
    })
}

module.exports = event;