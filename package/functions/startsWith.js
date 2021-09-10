const {docs} = require("../functions/docs/docs.json");

const startsWith = async (client, message, args, name, code) => {

    const r = code.split("$startsWith").length - 1

        let inside = code.split("$startsWith[")[r].split("]")[0]

        let [text, startswith] = inside.split(";");

        let err = client.suppress.get(message.idd)

        if (!text && err === undefined) return message.channel.send(`:x: Missing "text" content in 1st field of \`$startsWith[${inside}]\`.\n${docs.data}/startswith`)
        else if (!text && err !== undefined) return message.channel.send(err).catch(err => {})

        if (!startswith && err === undefined) return message.channel.send(`:x: Missing "starts with" content in 2nd field of \`$startsWith[${inside}]\`.\n${docs.data}/startswith`)
        else if (!startswith && err !== undefined) return message.channel.send(err).catch(err => {})

        code = code.replaceLast(`$startsWith[${inside}]`, text.startsWith(startswith))

        return {
            code: code
        }
    }
module.exports = startsWith;