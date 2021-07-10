const { docs } = require("../functions/docs/docs.json");
// require("discordbot-script/package/Utils/permissions");

const createRole = async (client, message, args, name, code) => {

    const r = code.split("$createRole").length - 1

    if (code.split("$createRole")[r].startsWith("[")) {

        let inside = code.split("$createRole[")[r].split("]")[0]

        let [name, color, position, hoisted, mentionable, guildID] = inside.split(";")

        let err = client.suppress.get(message.idd)

        let gid = (guildID ? guildID : message.guild.id)
        let guild = client.guilds.cache.get(gid)

        if (!message.guild.me.hasPermission("MANAGE_ROLES") && err === undefined) return message.channel.send(`:x: Failed to create role. Bot missing permissions.\n${docs.action}/createrole`)
        else if (!message.guild.me.hasPermission("MANAGE_ROLES") && err !== undefined) return message.channel.send(err).catch(err => { })


        if (hoisted === "no") {
            hoisted = false
        } else if (hoisted === "false") {
            hoisted = false
        } else if (hoisted === "yes") {
            hoisted = true
        } else if (hoisted === "true") {
            hoisted = true
        } else {
            hoisted = false
        }

        if (mentionable === "no") {
            mentionable = false
        } else if (mentionable === "false") {
            mentionable = false
        } else if (mentionable === "yes") {
            mentionable = true
        } else if (mentionable === "true") {
            mentionable = true
        } else {
            mentionable = false
        }

        try {
            await guild.roles.create({
                data: {
                    name: name || "new role",
                    color: color || "99AAB5",
                    position: position || 0,
                    hoist: hoisted,
                    mentionable: mentionable,
                    // permissions: permissions

                }
            })
        } catch {
            return message.channel.send(`:x: Failed to create role! Check if the field data is correct and bot/user/guild permissions allow the creation of a role by you, using the bot. \n${docs.action}/createrole`)
        }

        code = code.replaceLast(`$createRole[${inside}]`, "")

        return {
            code: code,
        }
    } else {
        try {
            await message.guild.roles.create({
                data: {
                    name: "new role",
                    color: "99AAB5",
                    position: 0,
                    hoist: false,
                    mentionable: false,
                    // permissions: permissions
                }
            })
        } catch {
            message.channel.send(`:x: Failed to create role! Check if bot/user/guild permissions allow the creation of a role by you, using the bot. \n${docs.action}/createrole`)
        }

        code = code.replaceLast(`$createRole`, "")

        return {
            code: code
        }
    }
}
module.exports = createRole;