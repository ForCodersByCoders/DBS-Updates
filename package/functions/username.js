const username = async (client, message, args, name, code, channel) => {

    const r = code.split("$username").length - 1

    if (code.split("$username")[r].startsWith("[")) {

        let inside = code.split("$username[")[r].split("]")[0]

        let id = (inside ? inside : message.author.id)
        let user = await client.users.fetch(id).catch(err => { })
        let err = client.suppress.get(message.idd)

        if (!user) user = { username: "unknown" }

        code = code.replaceLast(`$username[${inside}]`, user.username.split("[").join("").split("]").join(""))

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$username", message.author.username)

        return {
            code: code
        }
    }
}
module.exports = username;