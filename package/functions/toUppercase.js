const toUppercase = (client, message, args, name, code) =>{
    let r = code.split("$toUppercase[").length - 1

    let msg = code.split("$toUppercase[")[r].split("]")[0]

    code = code.replaceLast(`$toUppercase[${msg}]`, msg.toUpperCase())

    return {
        code: code
    }
}

module.exports = toUppercase;