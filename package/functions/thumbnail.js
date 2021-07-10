const Discord = require("discord.js")
const { docs } = require("../functions/docs/docs.json");

const thumbnail = (client, message, args, name, code) => {

    if (code.split("$thumbnail[").length >= 3) return message.channel.send(`❌ Can't use more than one $thumbnail.\n${docs.data}/thumbnail`)

    let inside = code.split("$thumbnail[")[1].split("]")[0]

    let embed = client.embeds.get(message.idd)
    if (!embed) embed = new Discord.MessageEmbed()

    if (inside) embed.setThumbnail(inside)

    client.embeds.set(message.idd, embed)

    code = code.replace(`$thumbnail[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = thumbnail