const { docs } = require("../functions/docs/docs.json");

const resume = (client, message, args, name, code) => {

    if (!client.queue.get(message.guild.id)) return message.channel.send(`:x: Bot is not currently playing audio! Catch with **$queueLength**\n${docs.music}/resume`)

    let dispatcher = client.queue.get(message.guild.id).connection.dispatcher

    if (!dispatcher.paused) return message.channel.send(`:x: Bot audio is not paused! Catch with **$isPaused**\n${docs.music}/resume`)

    dispatcher.resume()

    code = code.replaceLast("$resume", "")

    return {
        code: code,
    }
}

module.exports = resume;