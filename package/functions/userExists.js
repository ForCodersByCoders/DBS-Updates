const userExists = async (client, message, args, name, code) => {

    let r = code.split("$userExists[").length - 1

    let inside = code.split("$userExists[")[r].split("]")[0]

    let id = (inside ? inside : message.author.id)
    let user = await client.users.fetch(id).catch(err => { })

    code = code.replaceLast(`$userExists[${inside}]`, user ? true : false)

    return {
        code: code
    }
}

module.exports = userExists