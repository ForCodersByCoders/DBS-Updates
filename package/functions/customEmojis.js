const customEmojis = async (client, message, args, name, code) => {

    const r = code.split("$customEmojis").length - 1

    if (code.split("$customEmojis")[r].startsWith("[")) {

        let inside = code.split("$customEmojis[")[r].split("]")[0]
        const [text, separator = ", "] = inside.split(";"); 
        
        code = code.replaceLast(`$customEmojis[${inside}]`, (text.match(/(<a?:(\w{0,32}):(\d{17,18})>|\p{Emoji_Presentation})/gu) || []).join(separator))

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$customEmojis", (args.join(" ").match(/(<a?:(\w{0,32}):(\d{17,18})>|\p{Emoji_Presentation})/gu) || []).join(", "))
        
        return {
            code: code
        }
    }
}
module.exports = customEmojis;