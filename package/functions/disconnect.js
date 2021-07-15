const { docs } = require("../functions/docs/docs.json");

const disconnect = async (client, message, args, name, code) => {

    const r = code.split("$disconnect").length - 1

    if (code.split("$disconnect")[r].startsWith("[")) {

        let inside = code.split("$disconnect[")[r].split("]")[0]
        let id = (inside ? inside : message.guild.id)
        let guild = client.guilds.cache.get(id)
        if (!guild) return message.channel.send(`Error \`$disconnect\`: ${docs.music}/disconnect\nInvalid guild ID! Leave empty to define this guild!`)

        let err = client.suppress.get(message.idd)

        let queue = client.queue.get(message.guild.id)

        if (!queue) {
            let queueConnection = (queue ? true : false)
            if (queueConnection === false) {
                return message.channel.send(`Error \`$disconnect\`: ${docs.music}/disconnect\n${client.user.tag} is not in a voice channel in ${guild.name} **Catch with \`$voiceID[$client]\`**!`)
            } else {
                let queueChannel = queue.connection.channel
                client.queue.delete(message.guild.id)
                await queueChannel.leave();
            }
        }

        code = code.replaceLast(`$disconnect[${inside}]`, "")

        return {
            code: code,
        }
    } else {
        let queue = client.queue.get(message.guild.id)

        if (!queue) {
            let queueConnection = (queue ? true : false)
            if (queueConnection === false) {
                return message.channel.send(`Error \`$disconnect\`: ${docs.music}/disconnect\n${client.user.tag} is not in a voice channel. **Catch with \`$voiceID[$client]\`**!`)
            }
        } else {
            let queueChannel = queue.connection.channel
            client.queue.delete(message.guild.id)
            await queueChannel.leave();
        }
    }


    code = code.replaceLast("$disconnect", "")

    return {
        code: code
    }
}
module.exports = disconnect;
