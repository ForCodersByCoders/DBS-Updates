const isString = (client, message, args, name, code) => {
    let r = code.split("$isString[").length - 1
    let inside = code.split("$isString[")[r].split("]")[0]

    let result = undefined
    if (!isNaN(inside) === true) {
        result = false
    }
    else if (!isNaN(inside) === false) {
        result = true
    }

    code = code.replaceLast(`$isString[${inside}]`, result)

    return {
        code: code
    }
}

module.exports = isString;