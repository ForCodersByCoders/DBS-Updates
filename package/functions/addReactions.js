const { docs } = require("../functions/docs/docs.json");

const interpreter = require("../../package/interpreter.js")


const addReactions = async (client, message, args, name, code) => {

    if (code.split("$addReactions[").length >= 3) return message.channel.send(`:x: Can't use more than one \`$addReactions\`.\n${docs.action}/addreactions`)

    let inside = code.split("$addReactions[")[1].split("]")[0]

    let emojis = inside.split(";")

    emojis.forEach(async (m) => {
        await message.react(m).catch(err => message.channel.send(`Failed to react to bots message.\n${docs.action}/addreactions`))
    })

    code = code.replaceLast(`$addReactions[${inside}]`, "")

    client.addReactions.set(message.idd, emojis)

    return {
        code: code
    }

}

module.exports = addReactions;