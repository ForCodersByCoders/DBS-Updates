const {docs} = require("../functions/docs/docs.json");

const mentionedHereCount = async (client, message, args, name, code) => {

    const r = code.split("$mentionedHereCount").length - 1

    if (code.split("$mentionedHereCount")[r].startsWith("[")) {

        let inside = code.split("$mentionedHereCount[")[r].split("]")[0]

        let content = inside.split(/@here/gm);
            result = content.length - 1;

        code = code.replaceLast(`$mentionedHereCount[${inside}]`, result)


        return {
            code: code,
        }
    } else {

        let content = message.content.split(/@here/gm);
            result = content.length - 1;

        code = code.replaceLast("$mentionedHereCount", result)
        
        return {
            code: code
        }
    }
}
module.exports = mentionedHereCount;