const { docs } = require("../functions/docs/docs.json");

const toFixed = async (client, message, args, name, code) => {

    let r = code.split("$toFixed[").length - 1

    let inside = code.split("$toFixed[")[r].split("]")[0]

    let [num1, num2] = inside.split(";")

    num1 = Number(num1)
    num2 = Number(num2)

    if (isNaN(num1)) return message.channel.send(`:x: Invalid number in 1st field of $toFixed[${inside}].\n${docs.data}/tofixed`)
    if (isNaN(num2)) return message.channel.send(`:x: Invalid number in 2nd field of $toFixed[${inside}].\n${docs.data}/tofixed`)


    let output = num1.toFixed(num2)
    code = code.replaceLast(`$toFixed[${inside}]`, output)

    return {
        code: code
    }
}

module.exports = toFixed;