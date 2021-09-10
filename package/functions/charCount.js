const charCount = async (client, message, args, name, code) => {

    const r = code.split("$charCount").length - 1

    if (code.split("$charCount")[r].startsWith("[")) {

        let inside = code.split("$charCount[")[r].split("]")[0]

        let content = inside.length
        if (!inside) content = args.join(" ").length

        code = code.replaceLast(`$charCount[${inside}]`, content)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$charCount", args.join(" ").length)

        return {
            code: code
        }
    }
}
module.exports = charCount;