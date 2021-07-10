const ping = (client, message, args, name, code) => {

    code = code.replaceLast("$ping", client.ws.ping)

    return {
        code: code
    }
}
module.exports = ping