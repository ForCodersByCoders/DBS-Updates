const { docs } = require("../functions/docs/docs.json");

const numbersFrom = async (client, message, args, name, code, array) => {

    let r = code.split("$numbersFrom[").length - 1

    let inside = code.split("$numbersFrom[")[r].split("]")[0];
    let [start, end, sep = ", "] = inside.split(";");

    if (!start) return message.channel.send(`:x: Undefined starting point in 1st field of \`$numbersFrom[${inside}]\`.\n${docs.data}/numbersfrom`)
    else if (isNaN(start)) return message.channel.send(`:x: Invalid number in 1st field of \`$numbersFrom[${inside}]\`.\n${docs.data}/numbersfrom`)
    if (!end) return message.channel.send(`:x: Undefined ending point in 2nd field of \`$numbersFrom[${inside}]\`.\n${docs.data}/numbersfrom`)
    else if (isNaN(end)) return message.channel.send(`:x: Invalid number in 2nd field of \`$numbersFrom[${inside}]\`.\n${docs.data}/numbersfrom`)

    start--;
    end++;
    const result = [];
    for (var text = start; text < (end - 1); text++) {
        result.push(text + 1);
    }

    code = code.replaceLast(`$numbersFrom[${inside}]`, result.join(sep));

    return {
        code: code
    }
}

module.exports = numbersFrom;


// const splitTextFrom = (client, message, args, name, code, array) => {

//     let r = code.split("$splitTextFrom[").length - 1

//     let inside = code.split("$splitTextFrom[")[r].split("]")[0];
// let [start, end, sep] = inside.split(";");

//     let err = client.suppress.get(message.idd)

//     if (!array.length && err === undefined) return message.channel.send(`:x: Array is empty in \`$splitTextFrom[${inside}]\` .`)
//     else if (!array.length && err !== undefined) return message.channel.send(err).catch(err => {})

//     code = code.replaceLast(`$splitTextFrom[${inside}]`, array.slice(start, end).join(sep));

//     return {
//         code: code
//     }
// }

// module.exports = splitTextFrom;