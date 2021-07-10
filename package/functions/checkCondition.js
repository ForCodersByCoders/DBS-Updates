const { docs } = require("../functions/docs/docs.json");

const checkCondition = async (client, message, args, name, code) => {

    const r = code.split("$checkCondition[").length - 1

    let inside = code.split("$checkCondition[")[r].split("]")[0]

    let condition = inside

    let operators = ["==", "<", ">", "!=", ">=", "<="]

    let operator = undefined

    operators.map(x => {
        if (condition.includes(x)) {
            operator = x
        }
    })

    let err = client.suppress.get(message.idd)

    if (!operator && err === undefined) return message.channel.send(`❌ Invalid operator in \`$checkCondition[${inside}]\`.\n${docs.conditions}/checkcondition`)
    else if (!operator && err !== undefined) return message.channel.send(err).catch(err => { })

    let ops = condition.split(operator)

    let op = false

    if (condition.includes("==")) {
        if (ops[0] === ops[1]) op = true
    } else if (condition.includes("!=")) {
        if (ops[0] !== ops[1]) op = true
    } else if (condition.includes("<=")) {
        if (Number(ops[0]) <= Number(ops[1])) op = true
    } else if (condition.includes(">=")) {
        if (Number(ops[0]) >= Number(ops[1])) op = true
    } else if (condition.includes("<")) {
        if (Number(ops[0]) < Number(ops[1])) op = true
    } else if (condition.includes(">")) {
        if (Number(ops[0]) > Number(ops[1])) op = true
    }

    code = code.replaceLast(`$checkCondition[${inside}]`, op)

    return {
        code: code
    }
}

module.exports = checkCondition