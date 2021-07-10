const ms = require('parse-ms')
const moment = require("moment")
const { docs } = require("../functions/docs/docs.json");

const channel = async (client, message, args, name, code) => {

    let r = code.split("$channel[").length - 1

    let inside = code.split("$channel[")[r].split("]")[0]

    let [id, option] = inside.split(";")

    // let ch = message.guild.channels.cache.get(id ? id : message.channel.id)

    let CH;
    try {
        CH = await client.guilds.cache.find(g => g.channels.cache.get(id)).channels.cache.get(id)
    } catch {
        CH = { guild: {} };
    }

    if (!option) return message.channel.send(`:x: Missing option in 2nd field of \`$channel[${inside}]\`.\n${docs.compact}/channel`)
    if (![
        "created",
        "id",
        "isdeleted",
        "mention",
        "name",
        "position",
        "rawposition",
        "topic",
        "type",
        "created",
        "timestamp",
        "guildid",
        "guildname",
        "ismanageable",
        "parentid",
        "parentname",
        "isviewable",
        "isdeletable"
    ].includes(option.toLowerCase())) return message.channel.send(`:x: Invalid option in 2nd field of \`$channel[${inside}]\`.\n${docs.compact}/channel`)

    switch (option) {
        case "name": option = CH.name;
            break;
        case "id": option = CH.id;
            break;
        case "isdeleted":
            let Channel = client.guilds.cache.find(g => g.channels.cache.get(id))
            if (!Channel & (Channel === undefined)) option = true
            else option = Channel.deleted
            break;
        case "mention": option = CH.toString(id);
            break;
        case "position": option = CH.position;
            break;
        case "rawposition": option = CH.rawPosition;
            break;
        case "topic":
            try {
                option = CH.topic;
                if (option === (null || undefined)) option = undefined
            } catch {
                option = undefined
            }
            break;
        case "type":
            option = CH.type;
            break;
        case "created": option = moment(CH.createdAt).format("LLLL");
            break;
        case "timestamp":
            option = Object.entries(ms(Date.now() - CH.createdTimestamp)).map((x, y) => {
                if (x[1] > 0 && y < 4) return `${x[1]} ${x[0]}`
            }).filter(x => x).join(", ")
            if (!option) option = undefined
            break;
        case "guildid":
            option = CH.guild.id;
            break;
        case "guildname":
            option = CH.guild.name;
            break;
        case "ismanageable":
            option = CH.manageable;
            break;
        case "parentid":
            option = CH.parentID;
            break;
        case "parentname":
            option = CH.parent.name;
            break;
        case "isviewable":
            option = CH.viewable;
            break;
        case "isdeletable":
            option = CH.deletable
            break;
        default: undefined
    };

    code = code.replaceLast(`$channel[${inside}]`, option)

    return {
        code: code
    }
}

module.exports = channel;