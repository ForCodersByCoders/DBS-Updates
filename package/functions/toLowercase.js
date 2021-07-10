const toLowercase = (client, message, args, name, code) =>{
    let r = code.split("$toLowercase[").length - 1

    let msg = code.split("$toLowercase[")[r].split("]")[0]

    code = code.replaceLast(`$toLowercase[${msg}]`, msg.toLowerCase())

    return {
        code: code
    }
}

module.exports = toLowercase;