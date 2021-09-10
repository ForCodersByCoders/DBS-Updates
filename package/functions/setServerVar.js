const db = require('quick.db')

const setServerVar = async (client, message, args, name, code) => {

    let r = code.split("$setServerVar[").length - 1

    let inside = code.split("$setServerVar[")[r].split("]")[0]

    let [variable, value, id] = inside.split(";")

    if (!id) id = message.guild.id

    db.set(`${variable}_${id}`, value)

    code = code.replaceLast(`$setServerVar[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = setServerVar