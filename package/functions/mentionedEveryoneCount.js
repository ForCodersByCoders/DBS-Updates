const {docs} = require("../functions/docs/docs.json");

const mentionedEveryoneCount = async (client, message, args, name, code) => {

    const r = code.split("$mentionedEveryoneCount").length - 1

    if (code.split("$mentionedEveryoneCount")[r].startsWith("[")) {

        let inside = code.split("$mentionedEveryoneCount[")[r].split("]")[0]

        let content = inside.split(/@everyone/gm);
            result = content.length - 1;

        code = code.replaceLast(`$mentionedEveryoneCount[${inside}]`, result)


        return {
            code: code,
        }
    } else {

        let content = message.content.split(/@everyone/gm);
            result = content.length - 1;

        code = code.replaceLast("$mentionedEveryoneCount", result)
        
        return {
            code: code
        }
    }
}
module.exports = mentionedEveryoneCount;