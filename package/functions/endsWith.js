const {docs} = require("../functions/docs/docs.json");

const endsWith = async (client, message, args, name, code) => {

    const r = code.split("$endsWith").length - 1

        let inside = code.split("$endsWith[")[r].split("]")[0]

        let [text, endswith] = inside.split(";");

        let err = client.suppress.get(message.idd)

        if (!text && err === undefined) return message.channel.send(`❌ Missing "text" content in 1st field of \`$endsWith[${inside}]\`.\n${docs.conditions}/endswith`)
        else if (!text && err !== undefined) return message.channel.send(err).catch(err => {})

        if (!endswith && err === undefined) return message.channel.send(`❌ Missing "starts with" content in 2nd field of \`$endsWith[${inside}]\`.\n${docs.conditions}/endswith`)
        else if (!endswith && err !== undefined) return message.channel.send(err).catch(err => {})

        code = code.replaceLast(`$endsWith[${inside}]`, text.endsWith(endswith))

        return {
            code: code
        }
    }
module.exports = endsWith;