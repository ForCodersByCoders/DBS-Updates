const db = require('quick.db')

const setUserVar = async (client, message, args, name, code) => {

    let r = code.split("$setUserVar[").length - 1

    let inside = code.split("$setUserVar[")[r].split("]")[0]

    let [variable, value, id] = inside.split(";")

    if (!id) id = message.author.id

    await db.set(`${variable}_${message.guild.id}_${id}`, value)

    code = code.replaceLast(`$setUserVar[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = setUserVar