const {docs} = require("../functions/docs/docs.json");

const embed = require("discordbot-script/package/embed")

const ms = require("ms")

const edit = require('discordbot-script/package/bot/edit')
const addreactions_ = require("discordbot-script/package/bot/addreactions")
const delete_ = require('discordbot-script/package/bot/delete')

const interpret = require("discordbot-script/package/interpreter")

const awaitCmdReactions = async (client, message, args, name, code) => {

    if (code.split("$awaitCmdReactions[").length >= 3) return message.channel.send(`:x: Cant use more than one \`$awaitCmdReactions\`.\n${docs.action}/awaitcmdreactions`)

    let inside = code.split("$awaitCmdReactions[")[1].split(/]$/gm)[0]

    let [emojis, userID, time, command, error] = inside.split(";")

       
    let err = client.suppress.get(message.idd)
    
    if (!command && err === undefined) return message.channel.send(`:x: Not enough fields were given in \`$awaitCmdReactions[${inside}]\`.\n${docs.action}/awaitcmdreactions`)

    else if (!command && err !== undefined) return message.channel.send(err).catch(err => {})
    
    let object = {}

    let cmds = command.split(",")

    let emjs = emojis.split(",")

    emjs.map((e, y) => {
        object[e] = cmds[y]
    })

    let filter = (reaction, user) => {
        return emjs.includes(reaction.emoji.name) && client.user.id !== user.id && user.id === (userID === "everyone" ? user.id : userID)
    }

    
    message.awaitReactions(filter, {
        max: 1,
        errors: ["time"],
        time: ms(time)
    })
    .then(async collected => {

      
        let reaction = collected.first()

        let user = collected.first().users.cache.last()

        let cmd = client.awaitedCommands.get(object[reaction.emoji.name])

        if (!cmd && err === undefined) return message.channel.send(`:x: Invalid awaited command name (${object[reaction.emoji.name]}).\n${docs.action}/awaitcmdreactions`)
        else if (!cmd && err !== undefined) return message.channel.send(err).catch(err => {})

        let msg = {
            author: user,
            content: "",
            idd: Math.floor(Math.random() * 473484303707373),
            guild: message.guild,
            member: message.guild.members.cache.get(user.id)
        }

        let execute = await interpret(client, msg, [], cmd.name, cmd.code)

        if (execute) {  

            let channel = client.channel.get(message.idd)

            if (!channel) channel = message.channel
        
            msg = await require("discordbot-script/package/bot/attachment")(client, msg, channel, execute)
        
            client.channel.delete(message.idd)
        
            edit(client, message, msg, client.editIn.get(message.idd))
        
            delete_(client, message, msg)
        
            addreactions_(client, message, msg)
      
            client.addReactions.delete(message.idd)
      
            client.embeds.delete(message.idd)
        }
    })
    .catch(err => {
        if (!err.message) {
            if (error) {
                let err = embed(error)

                message.channel.send(err.error, err.embed)
            }
        } else {
            message.channel.send(err.message)
        }
    })

    code = code.replace(`$awaitCmdReactions[${inside}]`, "")
    
    return {
        code: code
    }
}

module.exports = awaitCmdReactions