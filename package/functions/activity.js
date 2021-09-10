const { docs } = require("../functions/docs/docs.json");

const activity = async (client, message, args, name, code) => {

    const r = code.split("$activity").length - 1

    if (code.split("$activity")[r].startsWith("[")) {

        let inside = code.split("$activity[")[r].split("]")[0]
        let id = (inside ? inside : message.author.id)

        let user;
        try {
            user = await client.users.fetch(id)
        } catch (error) {
            return message.channel.send(`:x: Invalid user ID in \`$activity[${inside}]\`.\n${docs.data}/activity`)
        }


        let err = client.suppress.get(message.idd)

        if (!user && err === undefined) return message.channel.send(`:x: Invalid user ID in \`$activity[${inside}]\`.\n${docs.data}/activity`)
        else if (!user && err !== undefined) return message.channel.send(err).catch(err => { })

        let activities = user.presence.activities.length

        if (!activities) activities = "none"
        else activities = user.presence.activities.join(", ")

        code = code.replaceLast(`$activity[${inside}]`, activities)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$activity", message.author.presence.activities)

        return {
            code: code
        }
    }
}
module.exports = activity;