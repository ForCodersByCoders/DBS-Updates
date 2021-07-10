const authorAvatar = async (client, message, args, name, code, channel) => {

    if (code.split("$authorAvatar")[1].startsWith("[")) {

        let inside = code.split("$authorAvatar[")[1].split("]")[0]

        let result;

        if (inside) {
            let [size, format] = inside.split(";")

            result = message.author.displayAvatarURL({ format: format, dynamic: true, size: size ? Number(size) : 512 })

        } else {
            result = message.author.displayAvatarURL({ format: "png", dynamic: true, size: 512 })
        }

        code = code.replaceLast(`$authorAvatar[${inside}]`, result)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$authorAvatar", message.author.displayAvatarURL({ format: "png", dynamic: true, size: 512 }))

        return {
            code: code
        }
    }
}
module.exports = authorAvatar;