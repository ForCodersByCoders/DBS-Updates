const moment = require("moment")
const ms = require("parse-ms")
const { docs } = require("../functions/docs/docs.json");

const user = async (client, message, args, name, code) => {

    let r = code.split("$user[").length - 1

    let inside = code.split("$user[")[r].split("]")[0]

    let [userID, option] = inside.split(";")

    let id = (userID ? userID : message.author.id)
    let user = await client.users.fetch(id).catch(err => { })

    if (!user) return message.channel.send(`:x: Invalid user ID in 1st field of \`$user[${inside}]\`.\n${docs.compacts}/user`)

    ch = message.channel.id

    if (!option) return message.channel.send(`:x: Missing option in 2nd field of \`$user[${inside}]\`.\n${docs.compacts}/user`)
    if (![
        "avatar",
        "banner",
        "created",
        "discrim",                    /* 14 options */
        "id",
        "isbot",
        "istyping",
        "lastmessagechannelid",
        "lastmessageid",
        "lastmessageurl",
        "mention",
        "name",
        "tag",
        "timestamp"
    ].includes(option.toLowerCase())) return message.channel.send(`:x: Invalid option in 2nd field of \`$user[${inside}]\`.\n${docs.compacts}/user`)

    switch (option) {
        case "avatar":
            option = user.displayAvatarURL(id) || undefined
            break;
        case "banner":
            const User = await client.api.users(id).get();
            option = User.banner ? `https://cdn.discordapp.com/banners/${User.id}/${User.banner}?size=512` : undefined
            break;
        case "created":
            option = moment(user.createdAt).format("LLLL") || undefined
            break;
        case "discrim":
            option = user.discriminator || undefined
            break;
        case "id":
            option = user.id || undefined
            break;
        case "isbot":
            option = user.bot
            break;
        case "istyping":
            option = user.typingIn(ch) || "false"
            break;
        case "lastmessagechannelid":
            option = user.lastMessageChannelID || undefined
            break;
        case "lastmessageid":
            option = user.lastMessageID || undefined
            break;
        case "lastmessageurl":
            try {
                option = user.lastMessage.url
            } catch {
                option = undefined
            }
            break;
        case "mention":
            option = user.toString(id) || undefined
            break;
        case "name":
            option = user.username || undefined
            break;
        case "tag":
            option = user.tag || undefined
            break;
        case "timestamp":
            option = Object.entries(ms(Date.now() - user.createdTimestamp)).map((x, y) => {
                if (x[1] > 0 && y < 4) return `${x[1]} ${x[0]}`
            }).filter(x => x).join(", ")
            if (!option) option = undefined
            break;

        default: undefined
    }

    code = code.replaceLast(`$user[${inside}]`, option)

    return {
        code: code
    }
}
module.exports = user;