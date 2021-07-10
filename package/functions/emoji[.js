const moment = require("moment")
const { docs } = require("../functions/docs/docs.json");

const emoji = async (client, message, args, name, code) => {
    let r = code.split("$emoji[").length - 1

    let inside = code.split("$emoji[")[r].split("]")[0]

    let [emojiID, guildID, option] = inside.split(";")

    let opt = option.toLowerCase()


    let guild;
    try {
        guild = await client.guilds.cache.get(guildID || message.guild.id)
    } catch {
        return message.channel.send(`:x: Invalid guild ID in 1st field of \`$emoji[${inside}]\`.\n${docs.compacts}/emoji`)
    }


    let emoji;
    try {
        emoji = await guild.emojis.cache.get(emojiID)
        if (!emoji && (opt === "isdeleted")) opt = true
    } catch {
        return message.channel.send(`:x: Invalid emoji ID in 2nd field of \`$emoji[${inside}]\`.\n${docs.compacts}/emoji`)
    }


    if (!opt) return message.channel.send(`:x: Missing option in 3rd field of \`$emoji[${inside}]\`.\n${docs.compacts}/emoji`)
    if (![ // 11 options
        "created",
        "emoji",
        "guildid",
        "guildname",
        "id",
        "identifier",
        "isanimated",
        "isdeleted",
        "ismanaged",
        "name",
        "url"
    ].includes(opt)) return message.channel.send(`:x: Invalid option in 3rd field of \`$emoji[${inside}]\`.\n${docs.compacts}/emoji`)

    switch (opt) {
        case "id":
            try {
                opt = emoji.id
            } catch {
                opt = undefined
            }
            break;
        case "emoji":
            try {
                opt = emoji.toString()
            } catch {
                opt = undefined
            }
            break;
        case "isanimated":
            try {
                opt = emoji.animated
            } catch {
                opt = undefined
            }
            break;
        case "name":
            try {
                opt = emoji.name
            } catch {
                opt = undefined
            }
            break;
        case "url":
            try {
                opt = emoji.url
            } catch {
                opt = undefined
            }
            break;
        case "isdeleted":
            try {
                opt = emoji.deleted
            } catch {
                opt = undefined
            }
            break;
        case "created":
            try {
                opt = moment(emoji.createdAt).format("LLLL")
            } catch {
                opt = undefined
            }
            break;
        case "identifier":
            try {
                opt = emoji.identifier
            } catch {
                opt = undefined
            }
            break;
        case "guildid":
            try {
                opt = emoji.guild
            } catch {
                opt = undefined
            }
            break;
        case "guildname":
            try {
                opt = emoji.guild.name
            } catch {
                opt = undefined
            }
            break;
        case "ismanaged":
            try {
                opt = emoji.managed
            } catch {
                opt = undefined
            }
    }


    code = code.replaceLast(`$emoji[${inside}]`, opt)

    return {
        code: code
    }
}
module.exports = emoji;