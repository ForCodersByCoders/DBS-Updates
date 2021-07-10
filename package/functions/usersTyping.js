const { docs } = require("../functions/docs/docs.json");

const usersTyping = async (client, message, args, name, code) => {

    let r = code.split("$usersTyping[").length - 1

    let inside = code.split("$usersTyping[")[r].split("]")[0]

    let [channelID, sep = ", "] = inside.split(";")


    let id = (channelID ? channelID : message.channel.id)
    let channel = await client.channels.fetch(id).catch(err => { })

    let err = client.suppress.get(message.idd)

    if (!channel && (inside.split(";").length === 1)) return message.channel.send(`:x: Invalid channel ID in \`$usersTyping[${inside}]\`.\n${docs.data}/userstyping`)
    else if (!channel && (inside.split(";").length === 2)) return message.channel.send(`:x: Invalid channel ID in 1st field of \`$usersTyping[${inside}]\`.\n${docs.data}/userstyping`)

    let typing = [];
    channel._typing.forEach(x => typing.push(x.user.tag));

    let result = typing.join(sep);

    code = code.replaceLast(`$usersTyping[${inside}]`, result || "None")

    return {
        code: code
    }
}

module.exports = usersTyping;