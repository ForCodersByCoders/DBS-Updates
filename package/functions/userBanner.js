const { docs } = require("../functions/docs/docs.json");

const userBanner = async (client, message, args, name, code, channel) => {

    if (code.split("$userBanner")[1].startsWith("[")) {

        let r = code.split("$userBanner[").length - 1

        let inside = code.split("$userBanner[")[r].split("]")[0]

        let id = (inside ? inside : message.author.id)

        const user = await client.api.users(id).get().catch(e => { });

        if (!user) return message.channel.send(`:x: Invalid user ID in \`$userBanner[${inside}]\`.\n${docs.data}/userbanner`)

        code = code.replaceLast(`$userBanner[${inside}]`, user.banner ? `https://cdn.discordapp.com/banners/${user.id}/${user.banner}?size=512` : undefined)


        return {
            code: code,
        }
    } else {

        let id = message.author.id

        const user = await client.api.users(id).get();

        code = code.replaceLast("$userBanner", user.banner ? `https://cdn.discordapp.com/banners/${user.id}/${user.banner}?size=512` : undefined)

        return {
            code: code
        }
    }
}
module.exports = userBanner;