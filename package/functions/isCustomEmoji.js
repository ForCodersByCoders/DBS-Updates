const isCustomEmoji = async (client, message, args, name, code) => {
    
    const r = code.split("$isCustomEmoji").length - 1

    let result;
        let inside = code.split("$isCustomEmoji[")[r].split("]")[0]

        async function isimage(url) {
            let bool;
            let fetch = require("node-fetch");
            let link;
            try {
                link = await fetch(url);
                bool = true;
            } catch {
                bool = false;
            }
            if (link && bool) {
                if (link.headers.get("content-type") != "image/png") bool = false;
            }
            return bool;
        }

        if (inside && inside.split(":")[0] && inside.split(":")[1] && inside.split(":")[2] && !inside.split(":")[3] && isimage("https://cdn.discordapp.com/emojis/" + inside.split(":")[2].replace('>', "") + inside.split(":")[0] == "a" ? ".gif" : ".png") &&  (inside.match(/<(a|):.{2,}:[1234567890]{2,}>/g) || []).length == 1 && (inside.match(/<(a|):.{2,}:[1234567890]{2,}>/g) || [])[0].length == inside.length) 

        result = true;
        else result = "false";

        code = code.replaceLast(`$isCustomEmoji[${inside}]`, result)

        return {
            code: code
        }
    }

module.exports = isCustomEmoji;