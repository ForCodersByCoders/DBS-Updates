const {docs} = require("../functions/docs/docs.json");

const isEveryoneMentioned = async (client, message, args, name, code) => {

    const r = code.split("$isEveryoneMentioned").length - 1

    if (code.split("$isEveryoneMentioned")[r].startsWith("[")) {

        let inside = code.split("$isEveryoneMentioned[")[r].split("]")[0]


let content = inside.includes("@everyone");
let result;
if(!content) {
    result = "false"
} else {
    result = "true"
}

        code = code.replaceLast(`$isEveryoneMentioned[${inside}]`, result)


        return {
            code: code,
        }
    } else {

        let content = message.content.includes("@everyone");
        let result;
        if(!content) {
            result = "false"
        } else {
            result = "true"
        }

        code = code.replaceLast("$isEveryoneMentioned", result)
        
        return {
            code: code
        }
    }
}
module.exports = isEveryoneMentioned;