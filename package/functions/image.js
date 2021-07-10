const Discord = require("discord.js")
const { docs } = require("../functions/docs/docs.json");

const image = (client, message, args, name, code) => {

    if (code.split("$image[").length >= 3) return message.channel.send(`❌ Can't use more than one $image.\n${docs.embeds}/image`)

    let inside = code.split("$image[")[1].split("]")[0]

    let embed = client.embeds.get(message.idd)
    if (!embed) embed = new Discord.MessageEmbed()
    embed.setImage(inside)

    client.embeds.set(message.idd, embed)

    code = code.replace(`$image[${inside}]`, "")
    return {
        code: code
    }
}

module.exports = image