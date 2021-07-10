const { docs } = require("discordbot-script/package/functions/docs/docs");

const guildVanityURL = async (client, message, args, name, code, channel) => {

    const r = code.split("$guildVanityURL").length - 1

    if (code.split("$guildVanityURL")[r].startsWith("[")) {

        let inside = code.split("$guildVanityURL[")[r].split("]")[0]
        let id = (inside ? inside : message.guild.id)
        let guild = client.guilds.cache.get(id);

        let err = client.suppress.get(message.idd)

        if (!guild && message.channel && err === undefined) return message.channel.send(`:x: Invalid guild ID in \`$guildVanityURL[${inside}]\`.\n${docs.data}/guildvanityurl`)
        else if (!guild && message.channel && err !== undefined) return message.channel.send(err).catch(err => { })

        let result;
        try {
            let vanity = await guild.fetchVanityData();
            result = "https://discord.gg/" + vanity.code;
        } catch {
            result = "undefined";
        }

        code = code.replaceLast(`$guildVanityURL[${inside}]`, result)

        return {
            code: code,
        }
    } else {
        let guild = message.guild
        let result;
        try {
            let vanity = await guild.fetchVanityData();
            result = "https://discord.gg/" + vanity.code;
        } catch {
            result = "undefined";
        }

        code = code.replaceLast("$guildVanityURL", result)

        return {
            code: code
        }
    }
}
module.exports = guildVanityURL;
