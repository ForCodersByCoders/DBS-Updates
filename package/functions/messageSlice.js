const { docs } = require("../functions/docs/docs.json");

const messageSlice = (client, message, args, name, code) => {

    let r = code.split("$messageSlice[").length - 1

    let inside = code.split("$messageSlice[")[r].split("]")[0]
    let result = [];

    let array = inside.split("");
    let splitedMsg = args

    let err = client.suppress.get(message.idd)
    if (Number(array[1]) > splitedMsg.length && err === undefined) return message.channel.send(`:x: Invalid operator in \`$messageSlice[${inside}]\`.\n${docs.data}/messageslice`)
    if (array[0] === "<") {

        for (let i = 0; i < Number(array[1]); i++) {
            result.push(splitedMsg[i])
        }
    } else if (array[0] === ">") {

        for (let i = Number(array[1]); i < splitedMsg.length; i++) {
            result.push(splitedMsg[i])
        }

    } else if (array[0] === "-") {

        splitedMsg.splice(Number(array[1]) - 1, 1)

        result = splitedMsg;

    } else {
        result = [splitedMsg[Number(inside) - 1]]
    }

    code = code.replaceLast(`$messageSlice[${inside}]`, result.join(" "))
    return {
        code: code
    }
}

module.exports = messageSlice;