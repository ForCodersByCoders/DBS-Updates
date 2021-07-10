const toLowerGoofcase = (client, message, args, name, code) => {
    let r = code.split("$toLowerGoofcase[").length - 1

    let msg = code.split("$toLowerGoofcase[")[r].split("]")[0]

    code = code.replaceLast(`$toLowerGoofcase[${msg}]`, msg.split(" ").map(word => word.toUpperCase().replace(word.toUpperCase()[0], word[0].toLowerCase())).join(" "))

    return {
        code: code
    }
}

module.exports = toLowerGoofcase;