const {docs} = require("../functions/docs/docs.json");

const isUserDMEnabled = async (client, message, args, name, code) => {

    const r = code.split("$isUserDMEnabled").length - 1

    if (code.split("$isUserDMEnabled")[r].startsWith("[")) {

        let inside = code.split("$isUserDMEnabled[")[r].split("]")[0]
        let id = (inside ? inside : message.author.id)
        let user =  await client.users.fetch(id).catch(err => {})
        let err = client.suppress.get(message.idd)

        if(!user && err === undefined) return message.channel.send(`:x: Invalid user ID in \`$isUserDMEnabled[${inside}]\`.\n${docs.data}/isuserdmenabled`)
        else if (!user && err !== undefined) return message.channel.send(err).catch(err => {})
        
        const dm = await user.send("").catch(err => err.code)

        code = code.replaceLast(`$isUserDMEnabled[${inside}]`, dm === 50007 ? false : true)

        return {
            code: code,
        }
    } else {

        const dm = await message.author.send("").catch(err => err.code)

        code = code.replaceLast("$isUserDMEnabled", dm === 50007 ? false : true)
        
        return {
            code: code
        }
    }
}
module.exports = isUserDMEnabled;