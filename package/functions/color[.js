const { docs } = require("../functions/docs/docs.json");

const Discord = require("discord.js")
const color = (client, message, args, name, code) => {

    if (code.split("$color[").length >= 3) return message.channel.send(`❌ Can't use more than one $color.\n${docs.embeds}/color`)

    let inside = code.split("$color[")[1].split("]")[0]

    let embed = client.embeds.get(message.idd)

    if (!embed) embed = new Discord.MessageEmbed()

    if (!inside) {
        embed.setColor("RANDOM")
    } else {
        embed.setColor(inside.toUpperCase())
    }

    client.embeds.set(message.idd, embed)

    code = code.replace(`$color[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = color