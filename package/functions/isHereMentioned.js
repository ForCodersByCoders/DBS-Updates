const {docs} = require("../functions/docs/docs.json");

const isHereMentioned = async (client, message, args, name, code) => {

    const r = code.split("$isHereMentioned").length - 1

    if (code.split("$isHereMentioned")[r].startsWith("[")) {

        let inside = code.split("$isHereMentioned[")[r].split("]")[0]


let content = inside.includes("@here");
let result;
if(!content) {
    result = "false"
} else {
    result = "true"
}

        code = code.replaceLast(`$isHereMentioned[${inside}]`, result)


        return {
            code: code,
        }
    } else {

        let content = message.content.includes("@here");
        let result;
        if(!content) {
            result = "false"
        } else {
            result = "true"
        }

        code = code.replaceLast("$isHereMentioned", result)
        
        return {
            code: code
        }
    }
}
module.exports = isHereMentioned;