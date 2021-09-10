const { docs } = require("../functions/docs/docs.json");

const guildRoles = async (client, message, args, name, code) => {

    const r = code.split("$guildRoles").length - 1

    if (code.split("$guildRoles")[r].startsWith("[")) {

        let inside = code.split("$guildRoles[")[r].split("]")[0]

        let [
            guildID,
            option = "name",
            separator
        ] = inside.split(";");

        let guild = client.guilds.cache.get(guildID ? guildID : message.guild.id)

        if (!guild) return message.channel.send(`:x: Invalid guild ID in \`$guildRoles[${inside}]\`.\n${docs.data}/guildroles`)

        let roles = await guild.roles.fetch().catch(e => { })

        if (!roles) return message.channel.send(`:x: The guild has no roles!\n\`$guildRoles[${inside}]\`.\n${docs.data}/guildroles`)

        if (!separator) separator = ", "

        if (option === "mention") {
            code = code.replaceLast(`$guildRoles[${inside}]`, roles.cache.filter(role => role.id !== message.guild.id).map(role => `<@&${role.id}>`).join(separator).split(/@everyone/gmi).join(""))
        } else {
            code = code.replaceLast(`$guildRoles[${inside}]`, roles.cache.filter(role => role.id !== message.guild.id).map(role => role.name).join(separator).split(/@everyone/gmi).join(""))
        }

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$guildRoles", message.guild.roles.cache.filter(role => role.id !== message.guild.id).map(role => role.name).join(", ").split(/@everyone/gmi).join(""))

        return {
            code: code
        }
    }
}
module.exports = guildRoles;
