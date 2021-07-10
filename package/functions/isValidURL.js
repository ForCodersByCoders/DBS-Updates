let fetch = require("node-fetch");
const isValidURL = async (client, message, args, name, code) => {

    const r = code.split("$isValidURL[").length - 1

        let inside = code.split("$isValidURL[")[r].split("]")[0]

    let link;
        try {
            await fetch(inside);
        link = true;
        } catch {
        link = false;
        }

            if (!inside)
        link = undefined

        code = code.replaceLast(`$isValidURL[${inside}]`, link)

        return {
            code: code
        }
    }
module.exports = isValidURL;