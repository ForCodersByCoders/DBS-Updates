const checkContains = async (client, message, args, name, code) => {

    const r = code.split("$checkContains[").length - 1

    let inside = code.split("$checkContains[")[r].split("]")[0]

    let fields = inside.split(";")

    let content = fields[0]

    let contains = false;

    for (let i = 1; i < fields.length; i++) {
        if (content.split(" ").find(x => x === fields[i])) {
            contains = true;
            break;
        }
    }

    code = code.replaceLast(`$checkContains[${inside}]`, contains)

    return {
        code: code
    }
}


module.exports = checkContains;