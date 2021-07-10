const ms = require('ms')
const db = require('quick.db')
const { docs } = require("../functions/docs/docs.json");

const addCooldown = async (client, message, args, name, code) => {

    if (code.split("$addCooldown[").length >= 3) return message.channel.send(`❌ Can't use more than one $addCooldown.\n${docs.action}/addcooldown`)

    let inside = code.split("$addCooldown[")[1].split("]")[0]

    let [time, opt, namee, id] = inside.split(";")

    if (isNaN(time)) time = ms(time)
    else time = Number(time)

    if (!namee) return message.channel.send(`❌ No command name is provided in 3rd field of \`$addCooldown[${inside}]\`.\n${docs.action}/addcooldown`)
    if (client.commands.get(namee || name) ? false : true) return message.channel.send(`❌ Invalid command name is provided in 3rd field of \`$addCooldown[${inside}]\`.\n${docs.action}/addcooldown`)

    if (!["command", "user", "guild", "category", "global", "channel"].includes(opt.toLowerCase())) return message.channel.send(`❌ Not a valid option in 2nd field of \`$addCooldown[${inside}]\`.\n${docs.action}/addcooldown`)




    switch (opt) {
        case "command": db.add(`${namee}`, time)
            break;

        case "user": if (!id) id = message.author.id
            let user;
            try {
                user = await client.users.fetch(id)
                db.add(`${namee}_${message.guild.id}_${id}`, time)
            } catch {
                return message.channel.send(`:x: Invalid ${opt} ID in 4th field of \`$addCooldown[${inside}]\`.\n${docs.action}/addcooldown`)
            }
            break;

        case "guild": if (!id) id = message.guild.id
            let guild;
            try {
                guild = await client.guilds.fetch(id)
                db.add(`${namee}_${id}`, time)
            } catch {
                return message.channel.send(`:x: Invalid ${opt} ID in 4th field of \`$addCooldown[${inside}]\`.\n${docs.action}/addcooldown`)
            }
            break;

        case "category": if (!id) id = message.channel.parent.id
            let channel;
            try {
                channel = await client.channels.fetch(id)
                if (channel.type !== "category") return message.channel.send(`:x: Invalid category ID in 4th field of \`$addCooldown[${inside}]\`.\n${docs.action}/addcooldown`)
                db.add(`${namee}_${id}`, time)
            } catch {
                return message.channel.send(`:x: Invalid ${opt} ID in 4th field of \`$addCooldown[${inside}]\`.\n${docs.action}/addcooldown`)
            }
            break;

        case "global": if (!id) id = message.author.id
            let global;
            try {
                global = await client.users.fetch(id)
                opt = "user"
                if (!global) return message.channel.send(`:x: Invalid ${opt} ID in 4th field of \`$addCooldown[${inside}]\`.\n${docs.action}/addcooldown`)
                db.add(`${namee}_${id}`, time)
            } catch { }
            break;

        case "channel": if (!id) id = message.channel.id
            let channel;
            try {
                channel = await client.channels.fetch(id)
                db.add(`${namee}_${id}`, time)
            } catch {
                return message.channel.send(`:x: Invalid ${opt} ID in 4th field of \`$addCooldown[${inside}]\`.\n${docs.action}/addcooldown`)
            }
    }

    code = code.replace(`$addCooldown[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = addCooldown;