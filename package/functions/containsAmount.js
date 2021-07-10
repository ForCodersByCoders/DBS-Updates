const containsAmount = (client, message, args, name, code) => {

    let r = code.split("$containsAmount[").length - 1

    let inside = code.split("$containsAmount[")[r].split("]")[0]
    let [content, check] = inside.split(";");

    let err = client.suppress.get(message.idd);
    let n;

    if (!content) { n = 0; }
    else if (!check) { n = ((content) ? content : "").length; }
    else { n = content.split(check).length - 1; }

    code = code.replaceLast(`$containsAmount[${inside}]`, n)

    return {
        code: code
    }
}

module.exports = containsAmount;