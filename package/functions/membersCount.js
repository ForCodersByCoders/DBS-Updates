const { docs } = require("../functions/docs/docs.json");

const membersCount = async (client, message, args, name, code) => {

    let r = code.split("$membersCount").length - 1

    if (code.split("$membersCount")[r].startsWith("[")) {

        let inside = code.split("$membersCount[")[r].split("]")[0]

        let [
            presences = ["online", "offline", "idle", "dnd", "bot", "human"],
            guildID
        ] = inside.split(";");


        presence = presences

        let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)
        if (!guild) return message.channel.send(`❌ Invalid guild ID in 1st field of \`$membersCount[${presence}]\`.\n${docs.data}/memberscount`)


        if (presence && !presences.includes(presence)) return message.channel.send(`❌ Invalid presence in \`$membersCount[${presence}]\`.\n${docs.data}/memberscount`)

        if (!presence) presence = "everyone"

        await guild.members.fetch()

        let filter;
        if (presences === "bot" || presences === "human") {
            let res = (presences === "bot" ? true : false)
            filter = guild.members.cache.filter(member => member.user.bot === res).size
        } else {

            filter = guild.members.cache.filter(member => member.presence.status === (presence === "everyone" ? member.presence.status : presence)).size
        }


        code = code.replaceLast(`$membersCount[${inside}]`, filter)

    } else {

        code = code.replaceLast("$membersCount", message.guild.members.cache.size)

    }

    return {
        code: code
    }
}
module.exports = membersCount;