const { docs } = require("../functions/docs/docs.json");
const db = require("quick.db")

const customCommandList = async (client, message, args, name, code) => {

    let r = code.split("$customCommandList[").length - 1

    let customCommands = await db.fetch(`customCommands_${message.guild.id}`) || []

    let inside = code.split("$customCommandList[")[r].split("]")[0]

    let [option, amount] = inside.split(";")

    if (!option) option = "{name} - {code}"

    if (!amount) amount = customCommands.length + 1

    if (isNaN(amount) || Number(amount) < 1) return message.channel.send(`:x: Invalid number in \`$customCommandList[${inside}]\`.\n${docs.data}/customcommandlist`)
    else amount = Number(amount)

    customCommands = customCommands.slice(0, amount)

    let content = []

    for (const command of customCommands) {
        content.push(option.replace("{name}", command.name).replace(`{code}`, command.code[0]))
    }

    code = code.replaceLast(`$customCommandList[${inside}]`, content.join("\n"))

    return {
        code: code
    }
}

module.exports = customCommandList