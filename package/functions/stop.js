const stop = async (client, message, args, name, code) => {

    if (!client.queue.get(message.guild.id)) return message.channel.send(`:x: Bot is not currently playing audio!\n${docs.music}/stop`)

    let dispatcher = client.queue.get(message.guild.id).connection.dispatcher

    dispatcher.end()
    client.queue.delete(message.guild.id);

    code = code.replaceLast("$stop", "")

    return {
        code: code,
    }
}

module.exports = stop;