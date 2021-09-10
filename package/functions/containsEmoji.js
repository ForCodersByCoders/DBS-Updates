const { docs } = require("../functions/docs/docs.json");

const containsEmoji = async (client, message, args, name, code) => {

    const r = code.split("$containsEmoji").length - 1

    let inside = code.split("$containsEmoji[")[r].split("]")[0]

    let [text] = inside.split(";");

    let err = client.suppress.get(message.idd)

    if (!text && err === undefined) return message.channel.send(`❌ Missing content in \`$containsEmoji[${inside}]\`.\n${docs.conditions}/containsemoji`)
    else if (!text && err !== undefined) return message.channel.send(err).catch(err => { });

    let n = /\p{Extended_Pictographic}/u.test(text);
    code = code.replaceLast(`$containsEmoji[${inside}]`, n)

    return {
        code: code
    }
}
module.exports = containsEmoji;