const { docs } = require("../functions/docs/docs.json");

const and = async (client, message, args, name, code) => {

    const r = code.split("$and[").length - 1

    let inside = code.split("$and[")[r].split("]")[0]

    let [condit1, condit2] = inside.split(";")

    let operators = ["==", "<", ">", "!=", ">=", "<="]

    let operator1 = undefined
    let operator2 = undefined
    let err = client.suppress.get(message.idd)

    if (!condit1 && err === undefined) return message.channel.send(`❌ Invalid condition in 1st field of \`$and[${inside}]\`.\n${docs.conditions}/and`)
    else if (!condit1 && err !== undefined) return message.channel.send(err).catch(err => { })
    if (!condit2 && err === undefined) return message.channel.send(`❌ Invalid condition in 2nd field of\`$and[${inside}]\`.\n${docs.conditions}/and`)
    else if (!condit2 && err !== undefined) return message.channel.send(err).catch(err => { })

    operators.map(x => {
        if (condit1.includes(x)) {
            operator1 = x
        }
    })

    operators.map(x => {
        if (condit2.includes(x)) {
            operator2 = x
        }
    })


    if (!operator1 && err === undefined) return message.channel.send(`❌ Invalid operator in 1st field of \`$and[${inside}]\`.\n${docs.conditions}/and`)
    else if (!operator1 && err !== undefined) return message.channel.send(err).catch(err => { })
    if (!operator2 && err === undefined) return message.channel.send(`❌ Invalid operator in 2nd field of\`$and[${inside}]\`.\n${docs.conditions}/and`)
    else if (!operator2 && err !== undefined) return message.channel.send(err).catch(err => { })



    let ops1 = condit1.split(operator1)

    let op1 = false

    if (condit1.includes("==")) {
        if (ops1[0] === ops1[1]) op1 = true
    } else if (condit1.includes("!=")) {
        if (ops1[0] !== ops1[1]) op1 = true
    } else if (condit1.includes("<=")) {
        if (Number(ops1[0]) <= Number(ops1[1])) op1 = true
    } else if (condit1.includes(">=")) {
        if (Number(ops1[0]) >= Number(ops1[1])) op1 = true
    } else if (condit1.includes("<")) {
        if (Number(ops1[0]) < Number(ops1[1])) op1 = true
    } else if (condit1.includes(">")) {
        if (Number(ops1[0]) > Number(ops1[1])) op1 = true
    }

    let ops2 = condit2.split(operator2)

    let op2 = false
    if (condit2.includes("==")) {
        if (ops2[0] === ops2[1]) op2 = true
    } else if (condit2.includes("!=")) {
        if (ops2[0] !== ops2[1]) op2 = true
    } else if (condit2.includes("<=")) {
        if (Number(ops2[0]) <= Number(ops2[1])) op2 = true
    } else if (condit2.includes(">=")) {
        if (Number(ops2[0]) >= Number(ops2[1])) op2 = true
    } else if (condit2.includes("<")) {
        if (Number(ops2[0]) < Number(ops2[1])) op2 = true
    } else if (condit2.includes(">")) {
        if (Number(ops2[0]) > Number(ops2[1])) op2 = true
    }

    let result;
    if ((op1 && op2) === true) result = 'true'
    else result = 'false'

    code = code.replaceLast(`$and[${inside}]`, result)

    return {
        code: code
    }
}

module.exports = and;