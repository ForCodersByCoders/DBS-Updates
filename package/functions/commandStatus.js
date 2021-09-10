const commandStatus = async (client, message, args, name, code) => {

    const r = code.split("$commandStatus").length - 1

    if (code.split("$commandStatus")[r].startsWith("[")) {

        let inside = code.split("$commandStatus[")[r].split("]")[0]
        let result;
        let cmd = client.commands.get(inside || name);

        if (!cmd) result = "undefined";
        else if (!cmd.status) result = "enabled";
        else result = cmd.status;

        code = code.replaceLast(`$commandStatus[${inside}]`, result)

        return {
            code: code,
        }
    } else {

        let result;
        let cmd = client.commands.get(name);

        if (!cmd) result = "undefined";
        else if (!cmd.status) result = "enabled";
        else result = cmd.status;

        code = code.replaceLast("$commandStatus", result)

        return {
            code: code
        }
    }
}
module.exports = commandStatus;