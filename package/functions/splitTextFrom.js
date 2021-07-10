const { docs } = require("../functions/docs/docs.json");

const splitTextFrom = (client, message, args, name, code, array) => {

    let r = code.split("$splitTextFrom[").length - 1

    let inside = code.split("$splitTextFrom[")[r].split("]")[0];
    let [start, end, sep] = inside.split(";");

    let err = client.suppress.get(message.idd)

    if (!array.length && err === undefined) return message.channel.send(`:x: \`$splitTextFrom[${inside}]\`: Could not find a value from a **$textSplit**.\n${docs.data}/splittextfrom`)
    else if (!array.length && err !== undefined) return message.channel.send(err).catch(err => { })

    start--;
    end++;
    const result = [];
    for (var text = start - 1; text < end - 2; text++) {
        result.push(array[text + 1]);
    }

    code = code.replaceLast(`$splitTextFrom[${inside}]`, result.join(sep));

    return {
        code: code
    }
}

module.exports = splitTextFrom;