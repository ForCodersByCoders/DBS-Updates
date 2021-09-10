const db = require('quick.db')

const setMessageVar = async (client, message, args, name, code) => {

    let r = code.split("$setMessageVar[").length - 1

    let inside = code.split("$setMessageVar[")[r].split("]")[0]

    let [variable, value, id] = inside.split(";")

    if (!id) id = message.id

    await db.set(`${variable}_${message.guild.id}_${id}`, value)

    code = code.replaceLast(`$setMessageVar[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = setMessageVar;