const { docs } = require("../functions/docs/docs.json");

const guildCategories = async (client, message, args, name, code) => {

    const r = code.split("$guildCategories").length - 1

    if (code.split("$guildCategories")[r].startsWith("[")) {

        let inside = code.split("$guildCategories[")[r].split("]")[0]

        let [
            guildID,
            option = "name"
        ] = inside.split(";");

        let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)

        if (!guild) return message.channel.send(`:x: Invalid guild ID in \`$guildCategories[${inside}]\`.\n${docs.data}/guildcategories`)

        if (option === "id") {
            code = code.replaceLast(`$guildCategories[${inside}]`, guild.channels.cache.filter(channel => channel.id !== message.guild.id && (channel.type === "category")).map(channel => channel.id).join(", "))
        } else {
            code = code.replaceLast(`$guildCategories[${inside}]`, guild.channels.cache.filter(channel => channel.id !== message.guild.id && (channel.type === "category")).map(channel => channel.name).join(", "))
        }

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$guildCategories", message.guild.channels.cache.filter(channel => (channel.id !== message.guild.id) && (channel.type === "category")).map(channel => channel.name).join(", "))

        return {
            code: code
        }
    }
}
module.exports = guildCategories;
