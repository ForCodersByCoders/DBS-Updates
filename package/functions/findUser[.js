const findUser = (client, message, args, name, code) => {
    let r = code.split("$findUser[").length - 1

    let inside = code.split("$findUser[")[r].split("]")[0]

    let [id, option] = inside.split(";")

    let user = client.users.cache.get(id) || message.mentions.users.first() || client.users.cache.find(user => user.username.toLowerCase() === id.toLowerCase()) || 'undefined'

    if(option === "mention") {
    code = code.replaceLast(`$findUser[${inside}]`, (user ? `<@!${user.id}>` : user))
    }
    else if(option === "name") {
        code = code.replaceLast(`$findUser[${inside}]`, (user ? user.username : user))
        }
        else if(option === "tag") {
            code = code.replaceLast(`$findUser[${inside}]`, (user ? user.tag : user))
            }

    else code = code.replaceLast(`$findUser[${inside}]`, (user ? user.id : user))

    return {
        code: code
    }
}

module.exports = findUser;
















/////


// const findUser = (client, message, args, name, code) => {
//     let r = code.split("$findUser[").length - 1

//     let option = code.split("$findUser[")[r].split("]")[0]

//     let user = client.users.cache.get(option) || message.mentions.users.first() || client.users.cache.find(user => user.username.toLowerCase() === option.toLowerCase()) || 'false'

//     code = code.replaceLast(`$findUser[${option}]`, user ? user.id : user)

//     return {
//         code: code
//     }
// }

// module.exports = findUser;