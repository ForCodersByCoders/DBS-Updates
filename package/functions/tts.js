const { docs } = require("../functions/docs/docs.json");

const tts = async (client, message, args, name, code) => {
    const r = code.split("$tts[").length - 1
    let inside = code.split("$tts[")[r].split("]")[0]
    let [channelID, msg, ttsSwitch] = inside.split(";")

    let ID = (channelID ? channelID : message.channel.id)
    let channel = await client.channels.fetch(ID).catch(e => { })

    if (!channel) return message.channel.send(`:x: Invalid channel ID in 1st field of \`$tts[${inside}]\`.\n${docs.action}/tts`)
    if (!msg) return message.channel.send(`:x: No message provided in 2nd field of \`$tts[${inside}]\`.\n${docs.action}/tts`)

    let final;
    if (ttsSwitch == "no" || ttsSwitch == "false") {
        final = await channel.send(msg, { tts: false }).catch(e => { })
    } else {
        final = await channel.send(msg, { tts: true }).catch(e => { })
    }

    if (!final) return message.channel.send(`:x: Failed to send tts message. \`$tts[${inside}]\`.\n${docs.action}/tts`)

    final

    return {
        code: code.replaceLast(`$tts[${inside}]`, "")
    }
}
module.exports = tts;