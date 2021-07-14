const uppercaseCount = (client, message, args, name, code) => {
    let r = code.split("$uppercaseCount[").length - 1
    let inside = code.split("$uppercaseCount[")[r].split("]")[0]

    let result;
    if (!inside) {
        result = "0"
    } else {
        result = inside.match(/[A-Z]/g).length
    }

    code = code.replaceLast(`$uppercaseCount[${inside}]`, result)

    return {
        code: code
    }
}

module.exports = uppercaseCount