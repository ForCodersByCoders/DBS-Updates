const channelExists = async (client, message, args, name, code) => {

    let r = code.split("$channelExists[").length - 1

    let inside = code.split("$channelExists[")[r].split("]")[0]


    let channel;
    let final;
    try {
        channel = await client.channels.fetch(inside)
    } catch (error) { }

    if (channel) final = true
    else if (!channel && channel === undefined) final = false

    code = code.replaceLast(`$channelExists[${inside}]`, final)

    return {
        code: code
    }
}

module.exports = channelExists;