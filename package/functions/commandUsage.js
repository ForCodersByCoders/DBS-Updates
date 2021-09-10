const commandUsage = async (client, message, args, name, code) => {

    const r = code.split("$commandUsage").length - 1

    if (code.split("$commandUsage")[r].startsWith("[")) {

        let inside = code.split("$commandUsage[")[r].split("]")[0]
        let err = client.suppress.get(message.idd)

        let usage;
        if (!client.commands.get(inside)) usage = client.commands.get(name).usage;
        else if (!client.commands.get(inside).usage) usage = "None";
        else if (!inside && err === undefined) usage = "undefined";
        else usage = client.commands.get(inside).usage;

        code = code.replaceLast(`$commandUsage[${inside}]`, usage)

        return {
            code: code,
        }
    } else {

        let usage;
        if (!client.commands.get(name).usage) usage = "None";
        else usage = client.commands.get(name).usage;

        code = code.replaceLast("$commandUsage", usage)

        return {
            code: code
        }
    }
}
module.exports = commandUsage;