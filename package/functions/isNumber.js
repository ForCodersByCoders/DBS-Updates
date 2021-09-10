const isNumber = (client, message, args, name, code) => {

    let r = code.split("$isNumber[").length - 1

    let n = code.split("$isNumber[")[r].split("]")[0]

    code = code.replaceLast(`$isNumber[${n}]`, !isNaN(n))

    return {
        code: code
    }
}

module.exports = isNumber