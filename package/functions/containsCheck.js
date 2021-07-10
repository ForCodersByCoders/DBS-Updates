const { docs } = require("../functions/docs/docs.json");

const containsCheck = async (client, message, args, name, code) => {

    const r = code.split("$containsCheck").length - 1

    let inside = code.split("$containsCheck[")[r].split("]")[0]

    let [text, option] = inside.split(";");

    let err = client.suppress.get(message.idd)

    if (!text && err === undefined) return message.channel.send(`❌ Missing "text" content in 1st field of \`$containsCheck[${inside}]\`.\n${docs.conditions}/containscheck`)
    else if (!text && err !== undefined) return message.channel.send(err).catch(err => { })

    if (!option && err === undefined) return message.channel.send(`❌ Missing option in 2nd field of \`$containsCheck[${inside}]\`.\n${docs.conditions}/containscheck`)
    else if (!option && err !== undefined) return message.channel.send(err).catch(err => { })
    else if (!["letters", "numbers", "symbols"].includes(option)) return message.channel.send(`:x: Invalid option in 2nd field of \`$containsCheck[${inside}]\`.\n${docs.conditions}/containscheck`);

    let result;

    if (option == "letters") result = text.replace(/[^a-zA-Z]/g, "");
    else if (option == "numbers") result = text.replace(/[^1234567890]/g, "");
    else if (option == "symbols") result = text.match(/[^a-zA-Z1234567890]/g).join("");
    else result = "undefined";

    code = code.replaceLast(`$containsCheck[${inside}]`, result)

    return {
        code: code
    }
}

module.exports = containsCheck;