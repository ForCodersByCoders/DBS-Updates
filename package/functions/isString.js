const isString = (client, message, args, name, code) => {

    let r = code.split("$isString[").length - 1

    let inside = code.split("$isString[")[r].split("]")[0]

    code = code.replaceLast(`$isString[${inside}]`, isNaN(inside))

    return {
        code: code
    }
}

module.exports = isString;