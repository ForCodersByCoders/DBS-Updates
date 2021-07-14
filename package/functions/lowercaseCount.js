const lowercaseCount = async (client, message, args, name, code) => {
    let r = code.split("$lowercaseCount[").length - 1
    let inside = code.split("$lowercaseCount[")[r].split("]")[0]

    let result;
    if (!inside) {
        result = "0"
    } else {
        result = inside.match(/[a-z]/g).length
    }

    code = code.replaceLast(`$lowercaseCount[${inside}]`, result)

    return {
        code: code
    }
}

module.exports = lowercaseCount
