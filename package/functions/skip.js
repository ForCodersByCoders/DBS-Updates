const { docs } = require("../functions/docs/docs.json");

const skip = async (client, message, args, name, code) => {

    if (!client.queue.get(message.guild.id)) return message.channel.send(`:x: Bot is not currently playing audio!\n${docs.music}/skip`)

    let dispatcher = client.queue.get(message.guild.id).connection.dispatcher

    let cancel = await dispatcher.end()

    if (!cancel) {
        return message.channel.send(`:x: Error: Failed to skip song!\n${docs.music}/skip`)
    }

    code = code.replaceLast("$skip", cancel)

    return {
        code: code,
    }
}

module.exports = skip;