const { docs } = require("../functions/docs/docs.json");

const getUserBadges = async (client, message, args, name, code) => {

    const r = code.split("$getUserBadges").length - 1

    if (code.split("$getUserBadges")[r].startsWith("[")) {
        let inside = code.split("$getUserBadges[")[r].split("]")[0]
        let id = (inside ? inside : message.author.id)
        let user = await client.users.fetch(id).catch(err => { })

        if (!inside && err === undefined) return message.channel.send(`:x: User ID is not provided in \`$getUserBadges\`.\n${docs.data}/getuserbadges`)
        if (!user && err === undefined) return message.channel.send(`:x: Invalid User ID in \`$getUserBadges[${inside}]\`.\n${docs.data}/getuserbadges`)

        let badges = await user.fetchFlags();

        code = code.replaceLast(`$getUserBadges[${inside}]`, badges.toArray())

        //.map(m => m.replace(/_/g, ' ').split(' ').map(str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()).join(' ')).join(", ")

        return {
            code: code,
        }
    } else {

        code = code.replaceLast("$getUserBadges", message.author.flags.toArray())

        return {
            code: code
        }
    }
}
module.exports = getUserBadges;