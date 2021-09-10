const { docs } = require("../functions/docs/docs.json");

const randomChannelID = async (client, message, args, name, code) => {

    const r = code.split("$randomChannelID").length - 1

    if (code.split("$randomChannelID")[r].startsWith("[")) {

        let inside = code.split("$randomChannelID[")[r].split("]")[0]

        let guild = client.guilds.cache.get(inside ? inside : message.guild.id)
        if (!guild) return message.channel.send(`:x: Invalid guild ID in \`$randomChannelID[${inside}]\`.\n${docs.data}/randomchannelid`)

        let result = guild.channels.cache.filter(ch => ch.type === "text").random().id


        code = code.replaceLast(`$randomChannelID[${inside}]`, result)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$randomChannelID", message.guild.channels.cache.filter(ch => ch.type === "text").random().id)

        return {
            code: code
        }
    }
}
module.exports = randomChannelID;