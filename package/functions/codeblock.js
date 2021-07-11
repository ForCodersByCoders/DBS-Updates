const { docs } = require("../functions/docs/docs.json");

const codeblock = async (client, message, args, name, code) => {

    const r = code.split("$codeblock[").length - 1
    let inside = code.split("$codeblock[")[r].split("]")[0]

    let [input, syntax] = inside.split(";");

    if (!input) return message.channel.send(`:x: Missing content in \`$codeblock[${inside}]\`.\n${docs.action}/codeblock`)


    if (syntax === "yes" || syntax === "true") {
        syntax = "js"
    } else {
        syntax = ""
    }

    code = code.replaceLast(`$codeblock[${inside}]`, `\`\`\`${syntax}\n${input}\n\`\`\``)

    return {
        code: code
    }
}

module.exports = codeblock;
