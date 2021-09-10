const { docs } = require("../functions/docs/docs.json");

const platform = async (client, message, args, name, code) => {

    const r = code.split("$platform").length - 1

    if (code.split("$platform")[r].startsWith("[")) {

        let inside = code.split("$platform[")[r].split("]")[0]
        let err = client.suppress.get(message.idd)

        let id = (inside ? inside : message.author.id)
        let user = await client.users.fetch(id).catch(err => { })

        if (!user && message && err === undefined) return message.channel.send(`:x: Invalid user ID in \`$platform[${inside}]\`.\n${docs.data}/platform`)
        else if (!user && message && err !== undefined) return message.channel.send(err).catch(err => { })


        let devices = user.presence.clientStatus

        if (devices) devices = Object.entries(devices).map(plat => {
            if (plat[0]) return plat[0]
            return ""
        }).filter(x => x !== "").join(", ")

        code = code.replaceLast(`$platform[${inside}]`, devices ? devices : "offline")

        return {
            code: code,
        }
    } else {

        let devices = message.author.presence.clientStatus

        if (devices) devices = Object.entries(devices).map(devide => {
            if (devide[0]) return devide[0]
            return ""
        }).filter(x => x !== "").join(", ")


        code = code.replaceLast("$platform", devices ? devices : "offline")

        return {
            code: code
        }
    }
}
module.exports = platform;