const { docs } = require("discordbot-script/package/functions/docs/docs");

const extractAmount = async (client, message, args, name, code) => {

    const r = code.split("$extractAmount").length - 1

    let inside = code.split("$extractAmount[")[r].split("]")[0]

    let [text, extracted] = inside.split(";");

    let err = client.suppress.get(message.idd)

    if (!text && err === undefined) return message.channel.send(`❌ Missing text in 1st field of \`$extractAmount[${inside}]\`.\n${docs.data}/extractAmount`)
    else if (!text && err !== undefined) return message.channel.send(err).catch(err => { });
    if (!extracted && err === undefined) return message.channel.send(`❌ Missing char in 2nd field of \`$extractAmount[${inside}]\`.\n${docs.data}/extractAmount`)
    else if (!extracted && err !== undefined) return message.channel.send(err).catch(err => { });


    let n = text.split(extracted).length - 1;

    code = code.replaceLast(`$extractAmount[${inside}]`, n)

    return {
        code: code
    }
}
module.exports = extractAmount;