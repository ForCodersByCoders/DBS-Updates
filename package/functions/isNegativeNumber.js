const isNegativeNumber = (client, message, args, name, code) => {

    let r = code.split("$isNegativeNumber[").length - 1

    let inside = code.split("$isNegativeNumber[")[r].split("]")[0]

let result;
    let check = Math.sign(inside)

    if(check === -1) {
        result = true
    } else {
        result = false
    }

    if(!isNaN(check) === false) result = undefined

    code = code.replaceLast(`$isNegativeNumber[${inside}]`, result)

    return {
        code: code
    }
}

module.exports = isNegativeNumber