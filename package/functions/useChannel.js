const { docs } = require("../functions/docs/docs.json");

const useChannel = async (client, message, args, name, code) => {

    if (code.split("$useChannel[").length >= 3) return message.channel.send(`:x: Cant use more than one \`$useChannel\`.\n${docs.action}/usechannel`)

    let id = code.split("$useChannel[")[1].split("]")[0]

    let channel = await client.channels.fetch(id).catch(err => { })

    let err = client.suppress.get(message.idd)

    if (!channel && err === undefined) return message.channel.send(`:x: Invalid channel ID in \`$useChannel[${id}]\`.\n${docs.action}/usechannel`)
    else if (!channel && err !== undefined) return message.channel.send(err).catch(err => { })

    client.channel.set(message.idd, channel)

    code = code.replace(`$useChannel[${id}]`, "")

    return {
        code: code
    }
}

module.exports = useChannel