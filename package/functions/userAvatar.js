const { docs } = require("../functions/docs/docs.json");

const userAvatar = async (client, message, args, name, code, channel) => {

    if (code.split("$userAvatar")[1].startsWith("[")) {

        let r = code.split("$userAvatar[").length - 1

        let inside = code.split("$userAvatar[")[r].split("]")[0]

        let [userID, size, format] = inside.split(";")

        let id = (userID ? userID : message.author.id)
        let user = await client.users.fetch(id).catch(err => { })

        if (!user) return message.channel.send(`:x: Invalid user ID in 1st field of \`$userAvatar[${inside}]\`.\n${docs.data}/useravatar`)

        let err = client.suppress.get(message.idd)


        if (![
            "png",
            "webp",
            "jpg",
            "jpeg",
            "gif"
        ].includes(format)) format = "png"

        let result = user.displayAvatarURL({ format: format, dynamic: true, size: (size ? Number(size) : 512) })


        code = code.replaceLast(`$userAvatar[${inside}]`, result)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$userAvatar", message.author.displayAvatarURL({ format: "png", dynamic: true, size: 512 }))

        return {
            code: code
        }
    }
}
module.exports = userAvatar;