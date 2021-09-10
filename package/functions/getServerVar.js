const db = require('quick.db')
const { docs } = require("discordbot-script/package/functions/docs/docs");

const getServerVar = async (client, message, args, name, code) => {

    let r = code.split("$getServerVar[").length - 1

    let inside = code.split("$getServerVar[")[r].split("]")[0]

    let [variable, id] = inside.split(";")

    if (!id) id = message.guild.id


    let err = client.suppress.get(message.idd)

    if (client.vars[variable] === undefined && err === undefined) return message.channel.send(`❌ Variable \`${variable}\` not found in command name: ${name}!\n${docs.variables}/getservervar`)
    else if (client.vars[variable] === undefined && err !== undefined) return message.channel.send(err).catch(err => { })


    let item = await db.fetch(`${variable}_${id}`)

    if (item === null) {
        item = client.vars[variable]
        db.set(`${variable}_${id}`, client.vars[variable])
    }

    code = code.replaceLast(`$getServerVar[${inside}]`, item)

    return {
        code: code
    }
}

module.exports = getServerVar