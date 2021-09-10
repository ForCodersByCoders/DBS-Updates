const ms = require('parse-ms')
const moment = require("moment")
const { docs } = require("../functions/docs/docs.json");

const voice = async (client, message, args, name, code) => {

    let r = code.split("$voice[").length - 1

    let inside = code.split("$voice[")[r].split("]")[0]

    let [channelID, option] = inside.split(";")


    let id = (channelID ? channelID : message.channel.id)
    let channel = await client.channels.fetch(id).catch(err => { })

    if (!channel) return message.channel.send(`:x: Invalid channel ID in 1st field of \`$voice[${inside}]\`.\n${docs.compact}/voice`)

    if (channel.type !== "voice" && option != "type") return message.channel.send(`:x: Must be an ID of a voice channel in 1st field of \`$voice[${inside}]\`.\n${docs.data}/voice`)


    if (!option) return message.channel.send(`:x: Missing option in 2nd field of \`$voice[${inside}]\`.\n${docs.compact}/voice`)
    if (![ //21 options
        "bitrate",
        "created",
        "guildid",
        "guildname",
        "id",
        "isdeletable",
        "isdeleted",
        "isfull",
        "isjoinable",
        "ismanageable",
        "isspeakable",
        "isviewable",
        "name",
        "parentid",
        "parentname",
        "position",
        "rawposition",
        "timestamp",
        "topic",
        "type",
        "userlimit"
    ].includes(option.toLowerCase())) return message.channel.send(`:x: Invalid option in 2nd field of \`$voice[${inside}]\`.\n${docs.compact}/voice`)

    switch (option) {
        case "isfull": option = channel.full;
            break;
        case "userlimit": option = channel.userLimit;
            break;
        case "bitrate": option = channel.bitrate / 1000;
            break;
        case "isjoinable": option = channel.joinable;
            break;
        case "isviewable": option = channel.viewable;
            break;
        case "isspeakable": option = channel.speakable;
            break;
        case "name": option = channel.name;
            break;
        case "id": option = channel.id;
            break;
        case "isdeleted":
            let Channel = client.guilds.cache.find(g => g.channels.cache.get(id))
            if (!Channel & (Channel === undefined)) option = true
            else option = Channel.deleted
            break;
        case "position": option = channel.position;
            break;
        case "rawposition": option = channel.rawPosition;
            break;
        case "topic":
            try {
                option = channel.topic;
                if (option === (null || undefined)) option = "undefined"
            } catch {
                option = "undefined"
            }
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
        case "isdeletable":
            option = channel.deletable
            break;
        case "type":
            option = channel.type;
            break;

        default: "undefined"
    };

    code = code.replaceLast(`$voice[${inside}]`, option)

    return {
        code: code
    }
}

module.exports = voice;