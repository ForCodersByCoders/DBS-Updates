const db = require('quick.db')

const setVar = async (client, message, args, name, code) => {

    let r = code.split("$setVar[").length - 1

    let inside = code.split("$setVar[")[r].split("]")[0]

    let [variable, value, id] = inside.split(";")

    if (!id) id = "0"

    await db.set(`${variable}_${id}`, value)

    code = code.replaceLast(`$setVar[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = setVar;