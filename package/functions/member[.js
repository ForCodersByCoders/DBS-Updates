const moment = require("moment")
const ms = require("parse-ms")
const { docs } = require("../functions/docs/docs.json");


const member = async (client, message, args, name, code) => {

    let r = code.split("$member[").length - 1

    let inside = code.split("$member[")[r].split("]")[0]

    let [userID, guildID, option] = inside.split(";")

    let member = await client.users.fetch(userID ? userID : message.author.id).catch(err => undefined)
    let guild = (client.guilds.cache.get(guildID ? guildID : message.guild.id))

    if (!member) return message.channel.send(`:x: Invalid user ID in 1st field of \`$member[${inside}]\`.\n${docs.compacts}/member`)
    if (!guild) return message.channel.send(`:x: Invalid guild ID in 2nd field of \`$member[${inside}]\`.\n${docs.compacts}/member`)

    let m = await guild.members.fetch(member).catch(err => undefined)

    if (!m && (option !== "exists")) return message.channel.send(`:x: Could not fetch member from the guild. \`$member[${inside}]\`.\n${docs.compacts}/member\n**Catch with the \`exists\` option!**`)

    if (option === "exists") return {
        code: code.replaceLast(`$member[${inside}]`, m !== undefined)
    }


    /* Returns the date and time the member boosted the guild*/
    let boostdate = moment(m.premiumSince).format("LLLL")

    /* Returns how long ago the member boosted */
    let booststamp = Object.entries(ms(Date.now() - m.premiumSinceTimestamp)).map((x, y) => {
        if (x[1] > 0 && y < 4) return `${x[1]} ${x[0]}`
    }).filter(x => x).join(", ");

    /* Returns the date and time the member joined the guild */
    let joindate = moment(m.joindate).format("LLLL");

    /* Returns how long ago the member joined the guild */
    let joinstamp = Object.entries(ms(Date.now() - m.joinstamp)).map((x, y) => {
        if (x[1] > 0 && y < 4) return `${x[1]} ${x[0]}`
    }).filter(x => x).join(", ");


    if (!option) return message.channel.send(`:x: Missing option in 3rd field of \`$member[${inside}]\`.`)
    if (![ //19 options
        "nickname",
        "id",
        "mention",
        "username",
        "rolecount",
        "isbannable",
        "isboosting",
        "iskickable",
        "exists",
        "hexcolor",
        "guildid",
        "guildname",
        "isbotabovemember",
        "booststamp",
        "boostdate",
        "joinstamp",
        "joindate",
        "presence",
        "boostcount"
    ].includes(option)) return message.channel.send(`:x: Invalid option in 3rd field of \`$member[${inside}]\`.`)

    switch (option) {
        case "nickname": option = m.displayName
            break;
        case "id": option = m.id
            break;
        case "mention": option = m.toString(m.id)
            break;
        case "username": option = m.user.username
            break;
        case "rolecount": option = m.roles.cache.size - 1
            break;
        case "isbannable": option = m.bannable
            break;
        case "iskickable": option = m.kickable
            break;
        case "exists":
            option = m.deleted
            if (option === false) {
                option = "true"
            } else if (option === true) {
                option = "false"
            }
            break;
        case "hexcolor": option = m.displayHexColor.split("#").join("")
            break;
        case "guildid": option = m.guild.id
            break;
        case "guildname": option = m.guild.name
            break;
        case "isbotabovemember": option = m.manageable
            break;
        case "booststamp": option = booststamp
            if (boostdate === "Invalid date") {
                option = "notboosting"
            }
            break;
        case "boostdate": option = boostdate
            if (boostdate === "Invalid date") {
                option = "notboosting"
            }
            break;
        case "boostcount": option = (m.premiumSubscriptionCount ? m.premiumSubscriptionCount : "0")
            break;
        case "isboosting": if (m.premiumSinceTimestamp === null || m.premiumSinceTimestamp === undefined) option = "false"
        else option = "true"
            break;
        case "joinstamp": option = joinstamp
            break;
        case "joindate": option = joindate
            break;
        case "presence":
            let platform = m.presence.clientStatus
            let status = m.presence.status
            if (status === "offline" && platform) { status = "invisible" }
            option = status
            break;

        default: undefined
    }


    code = code.replaceLast(`$member[${inside}]`, option)

    return {
        code: code
    }
}

module.exports = member
