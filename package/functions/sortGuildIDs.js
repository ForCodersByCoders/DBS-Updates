const { docs } = require("discordbot-script/package/functions/docs/docs");

const sortGuildIDs = async (client, message, args, name, code, channel) => {

    const r = code.split("$sortGuildIDs").length - 1

    if (code.split("$sortGuildIDs")[r].startsWith("[")) {

        let inside = code.split("$sortGuildIDs[")[r].split("]")[0]
        let fields = inside.split(";")
        let num = fields[0]
        if (!fields[0]) num = 10

        let separator = fields[1]
        if (!fields[1]) separator = ", "

        if (isNaN(num) || Number(num) < 1) return message.channel.send(`:x: Invalid number in \`$sortGuildIDs[${inside}]\`.\n${docs.data}/sortguildids`)

        code = code.replaceLast(`$sortGuildIDs[${inside}]`, client.guilds.cache.map(guild => guild.id).slice(0, Number(num)).join(separator))

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$sortGuildIDs", client.guilds.cache.map(guild => guild.id).slice(0, 10).join(", "))

        return {
            code: code
        }
    }
}
module.exports = sortGuildIDs;