const {docs} = require("../functions/docs/docs.json");

const editSplitText = (client, message, args, name, code, array) => {

    let r = code.split("$editSplitText[").length - 1

    let inside = code.split("$editSplitText[")[r].split("]")[0]
    let [number, editTo] = inside.split(";");
    let err = client.suppress.get(message.idd)

    if (!array.length && err === undefined) return message.channel.send(`❌ Array is empty in 2nd field of \`$editSplitText[${inside}]\`.\n${docs.action}/editsplittext`)
    else if (!array.length && err !== undefined) return message.channel.send(err).catch(err => {})
    if (!array[number - 1]) return message.channel.send(`:x: Nothing found in spot ` + number + ` of a \`$textSplit\`. $textSplit may be missing from code.\n${docs.action}/editsplittext`);
    array[number - 1] = editTo;

    code = code.replaceLast(`$editSplitText[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = editSplitText;