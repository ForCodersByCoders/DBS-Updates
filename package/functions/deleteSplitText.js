const {docs} = require("../functions/docs/docs.json");

const deleteSplitText = (client, message, args, name, code, array) => {

    let r = code.split("$deleteSplitText[").length - 1

    let inside = code.split("$deleteSplitText[")[r].split("]")[0]
    let err = client.suppress.get(message.idd)

    if (!array.length && err === undefined) return message.channel.send(`❌ Array is empty in \`$deleteSplitText[${inside}]\`.\n${docs.action}/deletesplittext`)
    else if (!array.length && err !== undefined) return message.channel.send(err).catch(err => {})
    if (!array[inside - 1]) return message.channel.send(`:x: Field number ` + inside + ` doesnt exist in a $textSplit.\n${docs.action}/deletesplittext`);

    array.splice(inside - 1, 1);

    code = code.replaceLast(`$deleteSplitText[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = deleteSplitText;