const numberHasDecimal = (client, message, args, name, code) => {

    let r = code.split("$numberHasDecimal[").length - 1
    let inside = code.split("$numberHasDecimal[")[r].split("]")[0];

    let output;
    if (isNaN(inside)) output = false;
    else if (!inside) output = undefined;
    else if (inside % 1 != 0) output = true;
    else output = false;

    code = code.replaceLast(`$numberHasDecimal[${inside}]`, output);

    return {
        code: code
    }
}

module.exports = numberHasDecimal;