const commandContains = async (client, message, args, name, code) => {

    const r = code.split("$commandContains").length - 1

    let inside = code.split("$commandContains[")[r].split(/]$/gm)[0]

    let [cmd, contains, sensitive] = inside.split(";");

    let err = client.suppress.get(message.idd)

    let result;
    let final;

    if (!client.commands.get(cmd)) result = client.commands.get(name).code.toString();
    else if (!cmd && err === undefined) result = "undefined";
    else if (!contains) result = "undefined";
    else result = client.commands.get(cmd).code.toString();

    if (sensitive) {
        if (sensitive === "yes") {
            result;
        }
        else if (sensitive === "true") {
            result;
        }
        else if (sensitive === "no") {
            result = result.toLowerCase();
        }
        else if (sensitive === "false") {
            result = result.toLowerCase();
        }
        else if (!sensitive) { }
    }

    final = result.split(contains)

    code = code.replaceLast(`$commandContains[${inside}]`, final ? true : false)

    return {
        code: code,
    }
}
module.exports = commandContains;