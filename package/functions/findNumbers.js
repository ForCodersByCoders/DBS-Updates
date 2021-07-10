const findNumbers = (client, message, args, name, code) => {
    let r = code.split("$findNumbers[").length - 1
    let inside = code.split("$findNumbers[")[r].split("]")[0]

    code = code.replaceLast(`$findNumbers[${inside}]`, inside.replace(/[^0-9]/g, ""));

    return {
        code: code
    }
}

module.exports = findNumbers;
