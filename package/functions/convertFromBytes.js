const { docs } = require("discordbot-script/package/functions/docs/docs");

const convertFromBytes = async (client, message, args, name, code) => {

    let r = code.split("$convertFromBytes[").length - 1

    let inside = code.split("$convertFromBytes[")[r].split("]")[0]

    let [data, option] = inside.split(";")
    option = option.toLowerCase()

    if (isNaN(data)) return message.channel.send(`:x: Invalid number in 1st field of \`$convertFromBytes[${inside}]\`.\n${docs.action}/convertFromBytes`)

    if (!option) return message.channel.send(`:x: Missing option in 2nd field of \`$convertFromBytes[${inside}]\`.\n${docs.action}/convertFromBytes`)
    if (![
        "kb",
        "mb",
        "gb",
        "tb"
    ].includes(option)) return message.channel.send(`:x: Invalid option in 2nd field of \`$convertFromBytes[${inside}]\`.\n${docs.action}/convertFromBytes`)


    let output = undefined;


    switch (option) {
        case "kb":
            output = data / 1000
            break;
        case "mb":
            output = data / 1000000
            break;
        case "gb":
            output = data / 1000000000
            break;
        case "tb":
            output = data / 1000000000000
            break;

        default: undefined
    }
    code = code.replaceLast(`$convertFromBytes[${inside}]`, output)

    return {
        code: code
    }
}

module.exports = convertFromBytes;