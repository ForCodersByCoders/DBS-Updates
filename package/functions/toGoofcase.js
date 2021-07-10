const toGoofcase = (client, message, args, name, code) => {
    let r = code.split("$toGoofcase[").length - 1

    let msg = code.split("$toGoofcase[")[r].split("]")[0]

    code = code.replaceLast(`$toGoofcase[${msg}]`, msg.split(" ").map(word => word.toLowerCase().replace(word.toLowerCase()[0], word[0].toUpperCase())).join(" "))

    return {
        code: code
    }
}

module.exports = toGoofcase;