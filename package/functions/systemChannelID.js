const { docs } = require("../functions/docs/docs.json");

const systemChannelID = async (client, message, args, name, code, channel) => {

    const r = code.split("$systemChannelID").length - 1

    if (code.split("$systemChannelID")[r].startsWith("[")) {

        let inside = code.split("$systemChannelID[")[r].split("]")[0]
        let id = (inside ? inside : message.guild.id)
        let server = client.guilds.cache.get(id)

        let err = client.suppress.get(message.idd)

        if (!server && message.channel && err === undefined) return message.channel.send(`:x: Invalid guild ID in \`$systemChannelID[${inside}]\`.\n${docs.data}/systemchannelid`)
        else if (!server && message.channel && err !== undefined) return message.channel.send(err).catch(err => { })

        code = code.replaceLast(`$systemChannelID[${inside}]`, server.systemChannelID || "undefined")

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$systemChannelID", message.guild.systemChannelID || "undefined")

        return {
            code: code
        }
    }
}
module.exports = systemChannelID;