const moment = require("moment");
const { docs } = require("../functions/docs/docs.json");

const msg = async (client, message, args, name, code) => {

    const r = code.split("$msg").length - 1

    if (code.split("$msg")[r].startsWith("[")) {

        let inside = code.split("$msg[")[r].split("]")[0]

        let [channelID, messageID, option] = inside.split(";")
        let err = client.suppress.get(message.idd)

        const channel = await client.channels.fetch(channelID).catch(err => { })
        if (!channel) return message.channel.send(`:x: Invalid channel ID in 1st field of \`$msg[${inside}]\`.\n${docs.compacts}/msg`)

        const msg = await channel.messages.fetch(messageID).catch(err => { })
        if (!msg) return message.channel.send(`:x: Invalid message ID in 2nd field of \`$msg[${inside}]\`.\n${docs.compacts}/msg`)

        let opt = option.toLowerCase()

        if (!opt) return message.channel.send(`:x: Missing option in 3rd field of \`$msg[${inside}]\`.\n${docs.compacts}/msg`)
        if (![
            "author",
            "authormention",
            "authortag",
            "authorname",
            "channel",
            "channelname",
            "cleancontent",
            "content",
            "created",
            "guildid",
            "id",
            "isdeletable",
            "isdeleted",
            "iseditable",
            "ispinnable",
            "ispinned",
            "rawcontent",
            "guildname",
            "url",
            "isedited",
            "old"
        ].includes(opt)) return message.channel.send(`:x: Invalid option in 3rd field of \`$msg[${inside}]\`.\n${docs.compacts}/msg`)

        switch (opt) {
            case "author": opt = msg.author;
                break;
            case "authormention": opt = msg.author.toString(messageID);
                break;
            case "authorname": opt = msg.author.username;
                break;
            case "authortag": opt = msg.author.tag;
                break;
            case "channel": opt = msg.channel;
                break;
            case "channelname": opt = msg.channel.name;
                break;
            case "cleancontent": opt = msg.cleanContent;
                break;
            case "content": opt = msg.content;
                break;
            case "created": opt = moment(msg.createdAt).format("LLLL");
                break;
            case "guildid": opt = msg.guild;
                break;
            case "id": opt = msg.id;
                break;
            case "isdeletable": opt = msg.deletable;
                break;
            case "isdeleted": opt = msg.deleted;
                break;
            case "iseditable": opt = msg.editable;
                break;
            case "ispinnable": opt = msg.pinnable;
                break;
            case "ispinned": opt = msg.pinned;
                break;
            case "rawcontent": opt = msg.cleanContent.split('@').join('');
                break;
            case "guildname": opt = msg.guild.name;
                break;
            case "url": opt = msg.url;
            case "isedited": if (msg.edits.length > 1) {
                opt = "true"
            } else {
                opt = "false"
            };
                break;
            case "old": if (msg.edits.length > 1 === "true") {
                num = msg.edits.length - 1
                opt = msg.edits[msg.edits.length - num].content;
            } else {
                opt = "undefined"
            }
        }

        if (!opt) opt = "undefined";

        code = code.replaceLast(`$msg[${inside}]`, opt)

        return {
            code: code
        }
    } else {

        code = code.replaceLast("$msg", message.id)

        return {
            code: code
        }
    }
}
module.exports = msg;