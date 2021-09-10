const db = require("quick.db")

const customCommandExists = async (client, message, args, name, code) => {

    let inside = code.split("$customCommandExists[")[1].split("]")[0]

    let [namee, guildd] = inside.split(";")

    let res = 'false'

    if (!guildd) guildd = message.guild.id

    let customCmds = await db.fetch(`customCommands_${guildd}`)

    if (!customCmds) res = 'false'
    if (customCmds) {
        let check = []
        customCmds.forEach(e => {
            check.push(e.name)
        })
        if (namee.replace(/a2008E/gm, "[").replace(/a2008A/gm, "]").replace(/:/gm, ";").includes(check)) res = 'true'
    }

    code = code.replaceLast(`$customCommandExists[${inside}]`, res)

    return {
        code: code
    }
}

module.exports = customCommandExists;