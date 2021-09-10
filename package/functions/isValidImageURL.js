let fetch = require("node-fetch");
const isValidImageURL = async (client, message, args, name, code) => {

    const r = code.split("$isValidImageURL[").length - 1

    let inside = code.split("$isValidImageURL[")[r].split("]")[0]

    let err = client.suppress.get(message.idd)

    let bool;
    let link;
    try {
        link = await fetch(inside);
        bool = true;
    } catch {
        bool = false;
    }
    if (link && bool) {
        if (!link.headers.get("content-type").startsWith("image")) bool = false;
    }

    if (!inside && err === undefined) bool = false

    code = code.replaceLast(`$isValidImageURL[${inside}]`, bool)

    return {
        code: code
    }
}
module.exports = isValidImageURL;
