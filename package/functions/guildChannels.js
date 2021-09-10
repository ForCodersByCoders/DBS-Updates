const { docs } = require("../functions/docs/docs.json");

const guildChannels = async (client, message, args, name, code) => {

    const r = code.split("$guildChannels").length - 1

    if (code.split("$guildChannels")[r].startsWith("[")) {

        let inside = code.split("$guildChannels[")[r].split("]")[0]

        let [
            guildID,
            option = "name",
            separator
        ] = inside.split(";");

        let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)

        if (!guild) return message.channel.send(`:x: Invalid guild ID in \`$guildChannels[${inside}]\`.\n${docs.data}/guildchannels`)


        if (!separator) separator = ", "


        if (option === "mention") {
            code = code.replaceLast(`$guildChannels[${inside}]`, guild.channels.cache.filter(channel => (channel.id !== message.guild.id) && (channel.type !== "category")).map(channel => `<#${channel.id}>`).join(separator))
        } else if (option === "id") {
            code = code.replaceLast(`$guildChannels[${inside}]`, guild.channels.cache.filter(channel => (channel.id !== message.guild.id) && (channel.type !== "category")).map(channel => channel.id).join(separator))
        } else {
            code = code.replaceLast(`$guildChannels[${inside}]`, guild.channels.cache.filter(channel => (channel.id !== message.guild.id) && (channel.type !== "category")).map(channel => channel.name).join(separator))
        }

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$guildChannels", message.guild.channels.cache.filter(channel => (channel.id !== message.guild.id) && (channel.type !== "category")).map(channel => channel.name).join(", "))

        return {
            code: code
        }
    }
}
module.exports = guildChannels;
