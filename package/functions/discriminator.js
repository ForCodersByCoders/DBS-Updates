const { docs } = require("../functions/docs/docs.json");

const discriminator = async (client, message, args, name, code) => {

    const r = code.split("$discriminator").length - 1

    if (code.split("$discriminator")[r].startsWith("[")) {

        let inside = code.split("$discriminator[")[r].split("]")[0]
        let id = (inside ? inside : message.author.id)
        let user = await client.users.fetch(id).catch(err => { })

        let err = client.suppress.get(message.idd)

        if (!user && err === undefined) return message.channel.send(`:x: Invalid user ID in \`$discriminator[${inside}]\`.\n${docs.data}/discriminator`)
        else if (!user && err !== undefined) return message.channel.send(err).catch(err => { })

        code = code.replaceLast(`$discriminator[${inside}]`, user.discriminator)

        return {
            code: code,
        }
    } else {

        code = code.replaceLast("$discriminator", message.author.discriminator)

        return {
            code: code
        }
    }
}
module.exports = discriminator;