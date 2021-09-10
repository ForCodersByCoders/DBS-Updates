const {docs} = require("../functions/docs/docs.json");

const charCase = async (client, message, args, name, code) => {

    const r = code.split("$charCase").length - 1

        let inside = code.split("$charCase[")[r].split("]")[0]

        let [text] = inside.split(";");

        let err = client.suppress.get(message.idd)

        if (!text && err === undefined) return message.channel.send(`❌ Missing character in \`$charCase[${inside}]\`.\n${docs.data}/charcase`)
        else if (!text && err !== undefined) return message.channel.send(err).catch(err => {});
else if (text.length > 1) return message.channel.send(`❌ The field in \`$charCase[${inside}]\` must contain only one character.\n${docs.data}/charcase`);

        let n;
        if (text.match(/[^a-zA-Z1234567890]/g) != null) n = "symbol";
        else if (text == text.toUpperCase()) n = "upper";
else if (text == text.toLowerCase()) n = "lower";
        code = code.replaceLast(`$charCase[${inside}]`, n)

        return {
            code: code
        }
    }
module.exports = charCase;