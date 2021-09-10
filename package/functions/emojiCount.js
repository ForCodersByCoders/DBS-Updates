const { docs } = require("discordbot-script/package/functions/docs/docs");

const emojiCount = async (client, message, args, name, code, channel) => {

    const r = code.split("$emojiCount").length - 1

    if (code.split("$emojiCount")[r].startsWith("[")) {

        let inside = code.split("$emojiCount[")[r].split("]")[0]
        let id = (inside ? inside : message.guild.id)
        let server = client.guilds.cache.get(id)

        let err = client.suppress.get(message.idd)

        if (!server && message && err === undefined && (!inside.includes("total") && (!inside.includes("all")))) return message.channel.send(`:x: Invalid input in \`$emojiCount[${inside}]\`.\n${docs.data}/emojicount`)
        else if (!server && message && err !== undefined) return message.channel.send(err).catch(err => { })

        switch (inside) {
            case "total":
            case "all":
                code = code.replaceLast(`$emojiCount[${inside}]`, client.emojis.cache.size)
                break;

            default: code = code.replaceLast(`$emojiCount[${inside}]`, server.emojis.cache.size)
                break;
        }

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$emojiCount", message.guild.emojis.cache.size)

        return {
            code: code
        }
    }
}
module.exports = emojiCount;