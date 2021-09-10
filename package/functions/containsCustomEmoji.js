const containsCustomEmoji = async (client, message, args, name, code) => {
    const r = code.split("$containsCustomEmoji").length - 1

    let inside = code.split("$containsCustomEmoji[")[r].split("]")[0];
    async function isimage(url) {
        let bool;
        let fetch = require("node-fetch");
        let wait;

        try {
            wait = await fetch(url);
            bool = true;
        } catch {
            bool = false;
        }

        if (wait && bool) {
            if (wait.headers.get("content-type") != "image/png") bool = false;
        }
        return bool;
    }

    let matches = inside.match(/<(a|):.{2,}:[1234567890]{2,}>/g) || [];
    matches = matches.filter(inside => inside && inside.split(":")[0] && inside.split(":")[1] && inside.split(":")[2] && !inside.split(":")[3] && isimage("https://cdn.discordapp.com/emojis/" + inside.split(":")[2].replace('>', "") + inside.split(":")[0] == "a" ? ".gif" : ".png"));

    let result;
    if (matches.length) result = true;
    else result = false;

    code = code.replaceLast(`$containsCustomEmoji[${inside}]`, result);
    return {
        code: code
    }
}
module.exports = containsCustomEmoji;