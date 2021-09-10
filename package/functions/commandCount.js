const commandCount = (client, message, args, name, code) => {

    code = code.replaceLast(`$commandCount`, client.commands.size);
    return {
        code: code
    }
}

module.exports = commandCount;