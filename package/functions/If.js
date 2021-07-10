const Embed = require("../../package/embed.js");
const execute = require("../../package/bot/executeCommand.js");
const { docs } = require("../functions/docs/docs.json");


const If = async (client, message, args, name, code) => {

    const r = code.split("$If[").length - 1

    let inside = code.split("$If[")[r].split("]")[0]

    let [condition, error] = inside.split(";")

    let operators = ["==", "<", ">", "!=", ">=", "<="]

    let operator = undefined

    operators.map(x => {
        if (condition.includes(x)) {
            operator = x
        }
    })

    let err = client.suppress.get(message.idd)

    if (!operator && err === undefined) return message.channel.send(`❌ Invalid operator in \`$If[${inside}]\`\n${docs.conditions}/if.`)
    else if (!operator && err !== undefined) return message.channel.send(err).catch(err => { })


    let ops = condition.split(operator)

    let op = true

    if (condition.includes("==")) {
        if (ops[0] === ops[1]) op = false
    } else if (condition.includes("!=")) {
        if (ops[0] !== ops[1]) op = false
    } else if (condition.includes("<=")) {
        if (Number(ops[0]) <= Number(ops[1])) op = false
    } else if (condition.includes(">=")) {
        if (Number(ops[0]) >= Number(ops[1])) op = false
    } else if (condition.includes("<")) {
        if (Number(ops[0]) < Number(ops[1])) op = false
    } else if (condition.includes(">")) {
        if (Number(ops[0]) > Number(ops[1])) op = false
    }

    if (!op) {
        if (error) {
            if (error.includes("{execute:")) {
                let m = await execute(client, message, args, error)
                error = m.error;
                if (!error) return undefined
            }
            error = Embed(error)
            return message.channel.send(error.error, error.embed)
        }
    }

    code = code.replaceLast(`$If[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = If;