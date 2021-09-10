const {docs} = require("../functions/docs/docs.json");

const allWebhooksCount = async (client, message, args, name, code) => {

    const r = code.split("$allWebhooksCount").length - 1

    if (code.split("$allWebhooksCount")[r].startsWith("[")) {

    let inside = code.split("$allWebhooksCount[")[r].split("]")[0]
    let ERROR = `:x: Invalid guild or channel ID in \`$allWebhooksCount[${inside}]\`.\n${docs.data}/allwebhookscount`;
    let guild = await client.guilds.cache.get(inside || message.guild.id)
    let channel;
    
        if (!guild) {
            channel = await client.channels.fetch(inside || message.channel.id).catch(err => message.channel.send(ERROR))
            if(channel.type === "category") return message.channel.send(ERROR)
        } else {
            !channel
        }

    let result
        if (!guild) {
            let err = client.suppress.get(message.idd)
            result = await channel.fetchWebhooks().catch(err => message.channel.send(ERROR))
        } else {
            result = await guild.fetchWebhooks().catch(err => message.channel.send(ERROR))
            // if ((!guild || !channel) && message && err === undefined) return message.channel.send(`:x: Invalid guild or channel ID in \`$allWebhooksCount[${inside}]\``)
        }


    code = code.replaceLast(`$allWebhooksCount[${inside}]`, result.size)

        return {
            code: code,
        }
    } else {
        let result = await message.guild.fetchWebhooks()

        code = code.replaceLast("$allWebhooksCount", result.size)

        return {
            code: code
        }
    }
}
module.exports = allWebhooksCount;