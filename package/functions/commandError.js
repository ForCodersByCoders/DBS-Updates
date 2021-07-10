const commandError = async (client, message, args, name, code) => {

    const r = code.split("$commandError").length - 1

    if (code.split("$commandError")[r].startsWith("[")) {

        let inside = code.split("$commandError[")[r].split("]")[0]
        let result;
        let cmd = client.commands.get(inside || name);

        if (!cmd) result = "undefined";
        else if (!cmd.error) result = "undefined";
        else result = cmd.error;

        code = code.replaceLast(`$commandError[${inside}]`, result)

        return {
            code: code,
        }
    } else {

        let result;
        let cmd = client.commands.get(name);

        if (!cmd) result = "undefined";
        else if (!cmd.error) result = "undefined";
        else result = cmd.error;

        code = code.replaceLast("$commandError", result)

        return {
            code: code
        }
    }
}
module.exports = commandError;