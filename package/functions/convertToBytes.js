const { docs } = require("discordbot-script/package/functions/docs/docs");

const convertToBytes = async (client, message, args, name, code) => {

    let r = code.split("$convertToBytes[").length - 1

    let inside = code.split("$convertToBytes[")[r].split("]")[0]

    let [data, option] = inside.split(";")
    option = option.toLowerCase()

    if (isNaN(data)) return message.channel.send(`:x: Invalid number in 1st field of \`$convertToBytes[${inside}]\`.\n${docs.action}/convertToBytes`)

    if (!option) return message.channel.send(`:x: Missing option in 2nd field of \`$convertToBytes[${inside}]\`.\n${docs.action}/convertToBytes`)
    if (![
        "kb",
        "mb",
        "gb",
        "tb"
    ].includes(option)) return message.channel.send(`:x: Invalid option in 2nd field of \`$convertToBytes[${inside}]\`.\n${docs.action}/convertToBytes`)


    let output = undefined;


    switch (option) {
        case "kb":
            output = data * 1000
            break;
        case "mb":
            output = data * 1000000
            break;
        case "gb":
            output = data * 1000000000
            break;
        case "tb":
            output = data * 1000000000000
            break;

        default: undefined
    }
    code = code.replaceLast(`$convertToBytes[${inside}]`, output)

    return {
        code: code
    }
}

module.exports = convertToBytes;