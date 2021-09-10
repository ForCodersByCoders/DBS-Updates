const moment = require("moment")
const ms = require('parse-ms')
const { docs } = require("../functions/docs/docs.json");

const role = async (client, message, args, name, code) => {

    let r = code.split("$role[").length - 1

    let inside = code.split("$role[")[r].split("]")[0]

    let [id, option] = inside.split(";")

    let ROLE;
    try {
        ROLE = await client.guilds.cache.find(g => g.roles.cache.get(id)).roles.fetch(id)
    } catch {
        ROLE = { guild: {} };
    }

    if (!option) return message.channel.send(`:x: Missing option in 2nd field of \`$role[${inside}]\`.\n${docs.compacts}/role`)
    if (![
        "created",
        "hex",
        "id",
        "isdeleted",
        "iseditable",
        "ishoisted",
        "ismanaged",
        "ismentionable",
        "mention",
        "name",
        "position",
        "rawposition",
        "guild",
        "guildname",
        "usercount",
        "timestamp"
    ].includes(option.toLowerCase())) return message.channel.send(`:x: Invalid option in 2nd field of \`$role[${inside}]\`.\n${docs.compacts}/role`)

    if (!ROLE & (option !== ("isdeleted"))) option = undefined

    switch (option) {
        case "name":
            option = ROLE.name;
            break;
        case "id":
            option = ROLE.id;
            break;
        case "mention":
            option = ROLE.toString(id);
            break;
        case "created":
            option = moment(ROLE.createdAt).format("LLLL");
            break;
        case "timestamp":
            option = Object.entries(ms(Date.now() - ROLE.createdTimestamp)).map((x, y) => {
                if (x[1] > 0 && y < 4) return `${x[1]} ${x[0]}`
            }).filter(x => x).join(", ")
            if (!option) option = undefined
            break;
        case "hex":
            option = ROLE.hexColor.replace("#", "");
            break;
        case "isdeleted":
            let ROLEE = client.guilds.cache.find(g => g.roles.cache.get(id))
            if (!ROLEE & (ROLEE === undefined)) option = true
            else option = ROLEE.deleted
            break;
        case "iseditable":
            option = ROLE.editable
            break;
        case "ishoisted":
            option = ROLE.hoist
            break;
        case "ismanaged":
            option = ROLE.managed
            break;
        case "ismentionable":
            option = ROLE.mentionable
            break;
        case "position":
            option = ROLE.position
            break;
        case "rawposition":
            option = ROLE.rawPosition
            break;
        case "guild":
            option = ROLE.guild
            break;
        case "guildname":
            option = ROLE.guild.name
            break;
        case "usercount":
            const Role = client.guilds.cache.find(g => g.roles.cache.get(id));
            option = Role.members.cache.filter(m => m.roles.cache.has(id)).size
        default: undefined
            break;
    }

    code = code.replaceLast(`$role[${inside}]`, option)

    return {
        code: code
    }
}

module.exports = role;



 // const moment = require("moment")

// const role = async (client, message, args, name, code) => {

//     let r = code.split("$role[").length - 1

//     let inside = code.split("$role[")[r].split("]")[0]

//     let [id, option] = inside.split(";")

//     let role = message.guild.roles.cache.get(id) || message.guild.roles.cache.find(role => role.id === inside)

//  let opt = option

//  if(!opt) return message.channel.send(`:x: Missing option in 2nd field of \`$role[${inside}]\`.`)
//  if(![
//     "created",
//     "hex",
//     "id",
//     "isdeleted",
//     "iseditable",
//     "ishoisted",
//     "ismanaged",
//     "ismentionable",
//     "mention",
//     "name",
//     "postition",
//     "rawposition",
//     "server",
//     "servername",
//     "usercount"
// ].includes(opt)) return message.channel.send(`:x: Invalid option in 2nd field of \`$role[${inside}]\`.`)

//     if(opt === "name") opt = role.name || undefined
//         else if(opt === "id") opt = role.id || undefined
//         else if(opt === "mention") opt = role.toString(id) || undefined
//         else if(opt === "ismentionable") opt = role.mentionable || undefined
//         else if(opt === "ishoisted") opt = role.hoist || undefined
//         else if(opt === "position") opt = role.position || undefined
//         else if(opt === "rawposition") opt = role.rawPosition || undefined
//         else if(opt === "ismanaged") opt = role.managed || undefined
//         else if(opt === "iseditable") opt = role.editable || undefined
//         else if(opt === "server") opt = role.guild || undefined
//         else if(opt === "servername") opt = role.guild.name || undefined
//         else if(opt === "hex") opt = role.hexColor.replace("#", "") || undefined
//         else if(opt === "usercount") opt = message.guild.members.cache.filter(m => m.roles.cache.has(role.id)).size
//         else if(opt === "created") opt = moment(role.createdAt).format("LLLL")
//         if(role.deleted === undefined) opt = true
//         else if(opt === "isdeleted") opt = role.deleted

//         if(!role) return message.channel.send(`:x: Invalid role ID in 1st field of \`$role[${inside}]\`.`)

//      code = code.replaceLast(`$role[${inside}]`, opt)

//      return {
//          code: code
//      }
//  }

//  module.exports = role;
