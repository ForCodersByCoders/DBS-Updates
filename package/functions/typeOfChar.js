const { docs } = require("../functions/docs/docs.json");

const typeOfChar = async (client, message, args, name, code) => {

    const r = code.split("$typeOfChar").length - 1

    let inside = code.split("$typeOfChar[")[r].split("]")[0]

    let err = client.suppress.get(message.idd)

    if (!inside && err === undefined) return message.channel.send(`❌ Missing "character" content in \`$typeOfChar[${inside}]\`\n${docs.data}/typeofchar`)
    else if (!inside && err !== undefined) return message.channel.send(err).catch(err => { })
    else if (inside.length > 1) return message.channel.send(`:x: Content in the field of \`$typeOfChar[${inside}]\` must be one character.\n${docs.data}/typeofchar`);

    let n;
    if (inside.match(/[^a-zA-Z1234567890]/g) != null) n = "symbol";
    else if (inside.match(/[1234567890]/g) != null) n = "number";
    else if (inside.match(/[a-zA-Z]/g) != null) n = "letter";
    else n = "undefined";
    code = code.replaceLast(`$typeOfChar[${inside}]`, n)

    return {
        code: code
    }
}
module.exports = typeOfChar;