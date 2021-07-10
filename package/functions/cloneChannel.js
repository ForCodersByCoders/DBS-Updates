const { docs } = require("../functions/docs/docs.json");

const cloneChannel = async (client, message, args, name, code) => {

    const r = code.split("$cloneChannel").length - 1

    if (code.split("$cloneChannel")[r].startsWith("[")) {

        let inside = code.split("$cloneChannel[")[r].split("]")[0]
        let [chan, returnChannel] = inside.split(";")
        let id = (chan ? chan : message.channel.id)

        let channel;
        try {
            channel = await client.channels.fetch(id)
        } catch (error) {
            return message.channel.send(`:x: Invalid channel ID in \`$cloneChannel[${inside}]\`.\n${docs.action}/clonechannel`)
        }

        let err = client.suppress.get(message.idd)

        if (!channel && message && err === undefined) return message.channel.send(`:x: Invalid channel ID in \`$cloneChannel[${inside}]\`.\n${docs.action}/clonechannel`)
        else if (!channel && message && err !== undefined) return message.channel.send(err).catch(err => { })

        let result;
        let cloned = await channel.clone()

        if (returnChannel === "yes") {
            result = cloned.id
        } else if (returnChannel === "true") {
            result = cloned.id
        } else {
            result = ""
        }


        code = code.replaceLast(`$cloneChannel[${inside}]`, await result)

        return {
            code: code,
        }
    } else {
        let channel = message.channel.id
        await channel.clone()

        code = code.replaceLast("$cloneChannel", "")

        return {
            code: code
        }
    }
}
module.exports = cloneChannel;