const { docs } = require("../functions/docs/docs.json");

const embed = require("../../package/embed.js")
const execute = require("../../package/bot/executeCommand.js")

const argsCheck = async (client, message, args, name, code) => {

    //   if (code.split("$argsCheck[").length >= 3 && !code.includes("$commandContainsAmount[", "$commandContains[")) return message.channel.send(`❌ can't use more than one \`$argsCheck\`.\n${docs.limiters}/argscheck`)

    let r = code.split("$argsCheck[").length - 1

    const inside = code.split("$argsCheck[")[r].split(/]$/gm)[0]


    let [condition, error] = inside.split(";")

    const operator = ["<", ">"].find(e => condition.includes(e))

    let e = embed(error)

    let cond = true

    const n = Number(condition.replace(operator || "", ""))

    if (operator === "<") {
        if (args[n] !== undefined) cond = false
    } else if (operator === ">") {
        if (args[n - 1] === undefined) cond = false
    } else {
        if (args.length !== n) cond = false
    }

    if (isNaN(n)) return message.channel.send(`❌ Invalid number in \`$argsCheck[${inside}]\`.\n${docs.limiters}/argscheck`)

    if (!cond) {
        if (error) {

            if (error.includes("{execute:")) {
                let m = await execute(client, message, args, error)

                error = m.error;

                if (!error) return undefined
            }

            error = embed(error)

            message.channel.send(error.error, error.embed)
        }

        return ""
    }


    code = code.replace(`$argsCheck[${inside}]`, "")

    return {
        code: code
    }
}
module.exports = argsCheck;