const isBoolean = async (client, message, args, name, code) => {
    const r = code.split("$isBoolean[").length - 1
    let inside = code.split("$isBoolean[")[r].split("]")[0]

    inside = inside.toLowerCase()
    let result;

    if ((inside == "yes") || (inside == "no") || (inside == "true") || (inside == "false") || (inside == "on") || (inside == "off")) {
        result = "true"
    } else {
        result = "false"
    }


    return {
        code: code.replaceLast(`$isBoolean[${inside}]`, result)
    }
}
module.exports = isBoolean;