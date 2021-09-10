const { docs } = require("../functions/docs/docs.json");

const createChannel = async (client, message, args, name, code) => {

    const r = code.split("$createChannel").length - 1

    if (code.split("$createChannel")[r].startsWith("[")) {

        let inside = code.split("$createChannel[")[r].split("]")[0]

        let [name, type, category] = inside.split(";")

        let err = client.suppress.get(message.idd)

        if (!name) name = "new-channel";
        if (!type) type = "text"

        if (!message.guild.me.hasPermission("MANAGE_GUILD") && err === undefined) return message.channel.send(`:x: Failed to create channel. Bot missing permissions.\n${docs.action}/createchannel`)
        else if (!message.guild.me.hasPermission("MANAGE_GUILD") && err !== undefined) return message.channel.send(err).catch(err => { })

        if (!category) category = "none"

        else category = message.guild.channels.cache.filter(ch => ch.type === "category").get(category)

        if (category === undefined && err === undefined) return message.channel.send(`:x: Invalid Category ID in \`$createChannel[${inside}]\`.\n${docs.action}/createchannel`)
        else if (category === undefined && err !== undefined) return message.channel.send(err).catch(err => { })

        if (category !== "none") {
            await message.guild.channels.create(name, {
                type: type,
                parent: category.id
            })
        } else {
            await message.guild.channels.create(name, {
                type: type
            })
        }

        code = code.replaceLast(`$createChannel[${inside}]`, "")

        return {
            code: code,
        }
    } else {
        await message.guild.channels.create("new-channel", {
            type: "text"
        })

        code = code.replaceLast("$createChannel", "")

        return {
            code: code
        }
    }
}
module.exports = createChannel;