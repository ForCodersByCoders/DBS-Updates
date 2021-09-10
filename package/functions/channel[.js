const ms = require('parse-ms')
const moment = require("moment")
const { docs } = require("../functions/docs/docs.json");

const channel = async (client, message, args, name, code) => {

    let r = code.split("$channel[").length - 1

    let inside = code.split("$channel[")[r].split("]")[0]

    let [channelID, option] = inside.split(";")

    let id = (channelID ? channelID : message.channel.id)
    let channel = await client.channels.fetch(id).catch(e => { })
    if (!channel) return message.channel.send(`:x: Invalid channel ID in 1st field of \`$channel[${inside}]\`.\n${docs.compact}/channel`)


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
        case "name": option = channel.name;
            break;
        case "id": option = channel.id;
            break;
        case "isdeleted":
            let Channel = client.guilds.cache.find(g => g.channels.cache.get(id))
            if (!Channel & (Channel === undefined)) option = true
            else option = Channel.deleted
            break;
        case "mention": option = channel.toString(id);
            break;
        case "position": option = channel.position;
            break;
        case "rawposition": option = channel.rawPosition;
            break;
        case "topic":
            option = (channel.topic ? channel.topic : "undefined")
            break;
        case "type":
            option = channel.type;
            break;
        case "created": option = moment(channel.createdAt).format("LLLL");
            break;
        case "timestamp":
            option = Object.entries(ms(Date.now() - channel.createdTimestamp)).map((x, y) => {
                if (x[1] > 0 && y < 4) return `${x[1]} ${x[0]}`
            }).filter(x => x).join(", ")
            if (!option) option = undefined
            break;
        case "guildid":
            option = channel.guild.id;
            break;
        case "guildname":
            option = channel.guild.name;
            break;
        case "ismanageable":
            option = channel.manageable;
            break;
        case "parentid":
            option = channel.parentID;
            break;
        case "parentname":
            option = channel.parent.name;
            break;
        case "isviewable":
            option = channel.viewable;
            break;
        case "isdeletable":
            option = channel.deletable
            break;
        default: undefined
    };

    code = code.replaceLast(`$channel[${inside}]`, option)

    return {
        code: code
    }
}

module.exports = channel;