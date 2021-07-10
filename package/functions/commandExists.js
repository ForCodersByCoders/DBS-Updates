const commandExists = (client, message, args, name, code) => {
    let r = code.split("$commandExists[").length - 1
    let inside = code.split("$commandExists[")[r].split("]")[0]

    let exists = client.commands.get(inside)

    code = code.replaceLast(`$commandExists[${inside}]`, exists ? true : false);

    return {
        code: code
    }
}

module.exports = commandExists;