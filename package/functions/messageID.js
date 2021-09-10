const messageID = async (client, message, args, name, code) => {

    code = code.replaceLast("$messageID", message.id)

    return {
        code: code
    }
}

module.exports = messageID;