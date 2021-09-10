const defaultEmojis = async (client, message, args, name, code) => {

    const r = code.split("$defaultEmojis").length - 1

    if (code.split("$defaultEmojis")[r].startsWith("[")) {

        let inside = code.split("$defaultEmojis[")[r].split("]")[0]
        const [text, separator = ", "] = inside.split(";");

        code = code.replaceLast(`$defaultEmojis[${inside}]`, (text.match(/\p{Extended_Pictographic}/gu) || []).join(separator))

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$defaultEmojis", (args.join(" ").match(/\p{Extended_Pictographic}/gu) || []).join(", "))

        return {
            code: code
        }
    }
}
module.exports = defaultEmojis;