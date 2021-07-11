const { docs } = require("../functions/docs/docs.json");

const codeblockMessage = async (client, message, args, name, code) => {

    const r = code.split("$codeblockMessage[").length - 1
    let inside = code.split("$codeblockMessage[")[r].split("]")[0]
    let [channelID, messageID, syntax] = inside.split(";");

    const channel = await client.channels.fetch(channelID).catch(err => { })
    if (!channel) return message.channel.send(`:x: Invalid channel ID in 1st field of \`$codeblockMessage[${inside}]\`.\n${docs.action}/codeblockmessage`)
    const msg = await channel.messages.fetch(messageID).catch(err => { })
    if (!msg) return message.channel.send(`:x: Invalid message ID in 2nd field of \`$codeblockMessage[${inside}]\`.\n${docs.action}/codeblockmessage`)

    if (syntax === "yes" || syntax === "true") {
        syntax = "js"
    } else {
        syntax = ""
    }


    code = code.replaceLast(`$codeblockMessage[${inside}]`, `\`\`\`${syntax}\n${msg.content}\n\`\`\``)

    return {
        code: code
    }
}

module.exports = codeblockMessage;