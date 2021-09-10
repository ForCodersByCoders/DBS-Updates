const { docs } = require("discordbot-script/package/functions/docs/docs");

const randomUserID = async (client, message, args, name, code) => {

    const r = code.split("$randomUserID").length - 1

    if (code.split("$randomUserID")[r].startsWith("[")) {

        let inside = code.split("$randomUserID[")[r].split("]")[0]

        let guild = client.guilds.cache.get(inside ? inside : message.guild.id)
        if (!guild) return message.channel.send(`:x: Invalid guild ID in \`$randomUserID[${inside}]\`.\n${docs.data}/randomUserID`)

        let result = guild.members.cache.filter(member => member.user.id).random().id


        code = code.replaceLast(`$randomUserID[${inside}]`, result)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$randomUserID", message.guild.members.cache.filter(member => member.user.id).random().id)

        return {
            code: code
        }
    }
}
module.exports = randomUserID;