const commandName = async (client, message, args, name, code) => {

    const r = code.split("$commandName").length - 1

    if (code.split("$commandName")[r].startsWith("[")) {

        let inside = code.split("$commandName[")[r].split("]")[0]
        let err = client.suppress.get(message.idd)

        let result;

        if (!client.commands.get(inside)) result = client.commands.get(name).name;
        else if (!inside && err === undefined) result = "undefined";
        else result = client.commands.get(inside).name;

        code = code.replaceLast(`$commandName[${inside}]`, result)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$commandName", client.commands.get(name).name)

        return {
            code: code
        }
    }
}
module.exports = commandName;