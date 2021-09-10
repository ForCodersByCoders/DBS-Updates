const moment = require("moment");
const { docs } = require("../functions/docs/docs.json");

const userStatus = async (client, message, args, name, code) => {

    let r = code.split("$userStatus[").length - 1

    let inside = code.split("$userStatus[")[r].split("]")[0]

    let [userID, option] = inside.split(";")

    let id = (userID ? userID : message.author.id)
    let user = await client.users.fetch(id).catch(err => { })

    if (!user) return message.channel.send(`:x: Invalid User ID in 1st field of \`$userStatus[${inside}]\`.\n${docs.compacts}/userstatus`)

    let opt = option.toLowerCase()

    if (!opt) return message.channel.send(`:x: Missing option in 2nd field of \`$userStatus[${inside}]\`.\n${docs.compacts}/userstatus`)
    if (![
        "state",
        "emoji",
        "type",
        "activityname",
        "started",
        "status",
        "details"
    ].includes(opt)) return message.channel.send(`:x: Invalid option in 2nd field of \`$userStatus[${inside}]\`.\n${docs.compacts}/userstatus`)

    switch (opt) {
        case "state":
            try {
                opt = user.presence.activities[0].state
                if (opt === null) opt = undefined
            } catch {
                opt = undefined
            }
            break;
        case "emoji":
            try {
                opt = user.presence.activities[0].emoji.toString()
                if (opt === null) opt = undefined
            } catch {
                opt = undefined
            }
            break;
        case "type":
            try {
                opt = user.presence.activities[0].type
                if (opt === null) opt = undefined
            } catch {
                opt = undefined
            }
            break;
        case "activityname":
            try {
                opt = user.presence.activities[0].name
                if (opt === null) opt = undefined
            } catch {
                opt = undefined
            }
            break;
        case "started":
            try {
                opt = moment(user.presence.activities[0].createdAt).format("LLLL")
                if (opt === null) opt = undefined
            } catch {
                opt = undefined
            }
            break;
        case "status":
            try {
                opt = user.presence.status
                if (opt === null) opt = undefined
            } catch {
                opt = undefined
            }
            break;
        case "details":
            try {
                opt = user.presence.activities[0].details
                if (user.presence.activities[0].details === null) opt = undefined;
                else opt = user.presence.activities[0].details;
            } catch {
                opt = undefined
            }
    }

    code = code.replaceLast(`$userStatus[${inside}]`, opt)

    return {
        code: code
    }
}
module.exports = userStatus;