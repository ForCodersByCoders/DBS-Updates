const lastArg = (client, message, args, name, code) => {

    code = code.replaceLast("$lastArg", args.pop())

    return {
        code: code
    }
}

module.exports = lastArg