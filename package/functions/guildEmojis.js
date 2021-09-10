const { docs } = require("../functions/docs/docs.json");

const guildEmojis = async (client, message, args, name, code) => {

    const r = code.split("$guildEmojis").length - 1

    if (code.split("$guildEmojis")[r].startsWith("[")) {

        let inside = code.split("$guildEmojis[")[r].split("]")[0]

        let [
            guildID,
            option = "emoji",
            separator
        ] = inside.split(";");

        let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)

        if (!guild) return message.channel.send(`:x: Invalid guild ID in \`$guildEmojis[${inside}]\`.\n${docs.data}/guildemojis`)

        if (!separator) separator = ", "


        if (option === "name") {
            code = code.replaceLast(`$guildEmojis[${inside}]`, guild.emojis.cache.filter(emoji => emoji.id !== message.guild.id).map(emoji => emoji.name).join(separator))
        } else if (option === "id") {
            code = code.replaceLast(`$guildEmojis[${inside}]`, guild.emojis.cache.filter(emoji => emoji.id !== message.guild.id).map(emoji => emoji.id).join(separator))
        } else {
            code = code.replaceLast(`$guildEmojis[${inside}]`, guild.emojis.cache.filter(emoji => emoji.id !== message.guild.id).map(emoji => emoji.toString()).join(separator))
        }

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$guildEmojis", message.guild.emojis.cache.filter(emoji => emoji.id !== message.guild.id).map(emoji => emoji.toString()).join(", "))

        return {
            code: code
        }
    }
}
module.exports = guildEmojis;
