const commandList = (client, message, args, name, code) => {

    const r = code.split("$commandList").length - 1

    if (code.split("$commandList")[r].startsWith("[")) {

        const inside = code.split("$commandList[")[r].split("]")[0]
        let splitr = inside;

        let result = client.commands.map(command => command.name).join(splitr || ', ')

        code = code.replaceLast(`$commandList[${inside}]`, result)

        return {
            code: code
        }
    } else {

        let result = client.commands.map(command => command.name).join(', ')

        code = code.replaceLast("$commandList", result)

        return {
            code: code
        }
    }
}
module.exports = commandList