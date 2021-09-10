const ms = require("ms");
const embed = require("../../package/embed.js");
const edit = require('../../package/bot/edit.js');
const {docs} = require("../functions/docs/docs.json");
const delete_ = require('../../package/bot/delete.js');
const interpret = require("../../package/interpreter.js");
const addreactions_ = require("../../package/bot/addreactions.js");
const execute = require("../../package/bot/executeCommand.js");

const awaitMessages = async (client, message, args, name, code) => {

    if (code.split("$awaitMessages[").length >= 3) return message.channel.send(`:x: Cant use more than one \`$awaitMessages\`.\n${docs.action}/awaitmessages`)

    let inside = code.split("$awaitMessages[")[1].split(/]$/gm)[0]

    let [msg, userID, time, command, error] = inside.split(";")

    let err = client.suppress.get(message.idd)

    if (!command && err === undefined) return message.channel.send(`:x: Not enough fields were given in \`$awaitMessages[${inside}]\`.\n${docs.action}/awaitmessages`)
    else if (!command && err !== undefined) return message.channel.send(err).catch(err => {})
    
    let object = {}

    let cmds = command.split(",")

    let msgs = msg.split(",")

    msgs.map((e, y) => {
        object[e] = cmds[y]
    })

    let filter = m => m.author.id === message.author.id

    const collector = message.channel.createMessageCollector(filter, {
        time: ms(time)
    })
    
    collector.on("collect", async msg => {
        
        if (userID !== "everyone") {
          if (msg.author.id !== userID) return message.channel.send(`:x: error in $awaitMessages`)
        }
      
        msg.idd = Math.floor(Math.random() * 473484303707373)

        let cmd = client.awaitedCommands.get(object[msg.content])
       
        if(!cmd) return;

        let execute = await interpret(client, msg, msg.content.split(" "), cmd.name, cmd.code)

        if (execute) { 

            let channel = client.channel.get(message.idd)

            if (!channel) channel = message.channel
        
            msg = await require("../bot/attachment.js")(client, msg, channel, execute)
        
            client.channel.delete(message.idd)
        
            edit(client, message, msg, client.editIn.get(message.idd))
        
            delete_(client, message, msg)
        
            addreactions_(client, message, msg)
    
            client.addReactions.delete(message.idd)
      
            client.embeds.delete(message.idd)
        }

        collector.stop()
    })
    
    collector.on("end", async collected => {
        if (!collected.size) {
            if (error) {
                if (error.includes("{execute:")) {
                    let m = await execute(client, message, args, error)
                    error = m.error;

                    if (!error) return undefined
                  }
                  
                  error = embed(error)
                  message.channel.send(error.error, error.embed) 
            }
            return ""
        }
    })

    code = code.replace(`$awaitMessages[${inside}]`, "")
    
    return {
        code: code
    }
}

module.exports = awaitMessages