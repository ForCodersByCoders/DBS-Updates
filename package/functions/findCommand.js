const findCommand = (client, message, args, name, code) => {
    let r = code.split("$findCommand[").length - 1
    let inside = code.split("$findCommand[")[r].split("]")[0]
    
    let result = (client.commands.get(inside.toLowerCase().trim()) || client.commands.find(e => (e.aliases || []).includes(inside.trim().toLowerCase())))

    code = code.replaceLast(`$findCommand[${inside}]`, result ? result.name : "undefined");

    return {
        code: code
    }
}

module.exports = findCommand;