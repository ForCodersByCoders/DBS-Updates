const ms = require('ms')
const db = require('quick.db')
const parse = require('parse-ms')
const embed = require('../../package/embed.js')
const { docs } = require("../functions/docs/docs.json");
const execute = require("../../package/bot/executeCommand.js");

const channelCooldown = async (client, message, args, name, code) => {

    if (code.split("$channelCooldown[").length >= 3) return message.channel.send(`❌ Can't use more than one $channelCooldown.\n${docs.limiters}/channelcooldown`)

    let inside = code.split("$channelCooldown[")[1].split(/]$/gm)[0]

    let [time, error] = inside.split(";")

    if (isNaN(time)) time = ms(time)
    else time = Number(time)

    let timeout = time

    let item = await db.fetch(`${name}_${message.channel.id}`)

    if (item !== null && timeout - (Date.now() - item) > 999) {

        if (error) {

            if (error.includes("{time}")) {

                let t = []

                Object.entries(parse(timeout - (Date.now() - item))).map((x, y) => {
                    if (x[1] > 0 && y < 4) t.push(`${x[1]} ${x[0]}`)
                })

                error.split("{time}").map(x => error = error.replace("{time}", t.join(", ")))
            }

            if (error.includes("{execute:")) {
                let m = await execute(client, message, args, error)

                error = m.error;

                if (!error) return undefined
            }

            error = embed(error)

            return message.channel.send(error.error, error.embed)
        }
        return ""

    } else db.set(`${name}_${message.channel.id}`, Date.now())

    code = code.replace(`$channelCooldown[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = channelCooldown;