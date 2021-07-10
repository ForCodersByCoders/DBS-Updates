const ms = require('ms')
const db = require('quick.db')
const parse = require('parse-ms')
const embed = require('../../package/embed.js')
const { docs } = require("../functions/docs/docs.json");

const commandCooldown = async (client, message, args, name, code) => {

    if (code.split("$commandCooldown[").length >= 3) return message.channel.send(`❌ Can't use more than one $commandCooldown.\n${docs.limiters}/commandcooldown`)

    let inside = code.split("$commandCooldown[")[1].split("]")[0]

    let [time, error] = inside.split(";")

    if (isNaN(time)) time = ms(time)
    else time = Number(time)

    let timeout = time

    let item = await db.fetch(`${name}`)

    if (item !== null && timeout - (Date.now() - item) > 999) {

        if (error) {

            if (error.includes("{time}")) {

                let t = []

                Object.entries(parse(timeout - (Date.now() - item))).map((x, y) => {
                    if (x[1] > 0 && y < 4) t.push(`${x[1]} ${x[0]}`)
                })

                error.split("{time}").map(x => error = error.replace("{time}", t.join(", ")))
            }

            let e = embed(error)

            return message.channel.send(e.error, e.embed)
        }

        return ""
    } else db.set(`${name}`, Date.now())

    code = code.replace(`$commandCooldown[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = commandCooldown;