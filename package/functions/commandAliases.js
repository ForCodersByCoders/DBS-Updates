const commandAliases = async (client, message, args, name, code) => {

    const r = code.split("$commandAliases").length - 1

    if (code.split("$commandAliases")[r].startsWith("[")) {

        let inside = code.split("$commandAliases[")[r].split("]")[0]
        let err = client.suppress.get(message.idd)

        let aliass;
        if (!client.commands.get(inside)) aliass = "undefined";
        else if (!client.commands.get(inside).aliases) aliass = "None";
        else if (!inside && err === undefined) aliass = "undefined";
        else aliass = client.commands.get(inside).aliases.join(", ");


        code = code.replaceLast(`$commandAliases[${inside}]`, aliass)

        return {
            code: code,
        }
    } else {

        let aliases;
        if (!client.commands.get(name).aliases) aliases = "None";
        else aliases = client.commands.get(name).aliases.join(", ");

        code = code.replaceLast("$commandAliases", aliases)

        return {
            code: code
        }
    }
}
module.exports = commandAliases;