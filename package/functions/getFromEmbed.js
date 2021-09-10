const f = require('../../package/embed.js')
const { docs } = require("../functions/docs/docs.json");

const getFromEmbed = async (client, message, args, name, code) => {

    let r = code.split("$getFromEmbed[").length - 1

    let inside = code.split("$getFromEmbed[")[r].split("]")[0]

    let [ch, msg, type] = inside.split(";")
    let channel = await client.channels.fetch(ch).catch(e => { });
    if (!channel) return message.channel.send(`:x: Invalid channel ID in 1st field of \`$getFromEmbed[${inside}]\`\n${docs.compacts}/getfromembed`);
    if (!msg) return message.channel.send(`:x: Invalid message ID in 2nd field of \`$getFromEmbed[${inside}]\`\n${docs.compacts}/getfromembed`);
    if (isNaN(msg)) return message.channel.send(`:x: Invalid message ID in 2nd field of \`$getFromEmbed[${inside}]\`.\n${docs.compacts}/getfromembed`);
    if (!msg) return message.channel.send(`:x: Missing message ID in 2nd field of \`$getFromEmbed[${inside}]\`.\n${docs.compacts}/getfromembed`);
    let output = undefined;
    let m = await channel.messages.fetch(msg).catch(e => {
        return message.channel.send(`:x: Could not locate message from the \`${channel.name}\` channel! \`$getFromEmbed[${inside}]\`.\n${docs.compacts}/getfromembed`);
    });


    if (![ // 14 options
        "author",
        "authoricon",
        "title",
        "description",
        "footer",
        "footericon",
        "color",
        "thumbnail",
        "image",
        "descriptionlength",
        "footerlength",
        "titlelength",
        "totallength",
        "type"
    ].includes(type.toLowerCase())) return message.channel.send(`:x: Invalid option in 3rd field of \`$getFromEmbed[${inside}]\`.\n${docs.compacts}/getfromembed`)



    switch (type) {
        case "author":
            if (m.embeds[0] == undefined) { output = "undefined" }
            else { output = m.embeds[0].author.name }
            break;
        case "authoricon":
            if (m.embeds[0] == undefined) { output = "undefined" }
            else { output = m.embeds[0].author.iconURL }
            break;
        case "title":
            if (m.embeds[0] == undefined) { output = "undefined" }
            else { output = m.embeds[0].title }
            break;
        case "description":
            if (m.embeds[0] == undefined) { output = "undefined" }
            else { output = m.embeds[0].description }
            break;
        case "footer":
            if (m.embeds[0] == undefined) { output = "undefined" }
            else { output = m.embeds[0].footer.text }
            break;
        case "footericon":
            if (m.embeds[0] == undefined) { output = "undefined" }
            else { output = m.embeds[0].footer.iconURL }
            break;
        case "color":
            if (m.embeds[0] == undefined) { output = "undefined" }
            else { output = m.embeds[0].hexColor.replace('#', '') }
            break;
        case "thumbnail":
            if (m.embeds[0] == undefined) { output = "undefined" }
            else { output = m.embeds[0].thumbnail.url }
            break;
        case "image":
            if (m.embeds[0] == undefined) { output = "undefined" }
            else if (output === null) { output = "undefined" }
            else {
                output = await m.embeds[0].image
                if (output === null) output = "undefined"
            }
            break;
        case "type":
            if (m.embeds[0] == undefined) { output = "NoEmbed" }
            else { output = m.embeds[0].type }
            break;
        case "descriptionlength":
            if (m.embeds[0] == undefined) { output = "undefined" }
            else { output = m.embeds[0].description.length }
            break;
        case "titlelength":
            if (m.embeds[0] == undefined) { output = "undefined" }
            else { output = m.embeds[0].title.length }
            break;
        case "footerlength":
            if (m.embeds[0] == undefined) { output = "undefined" }
            else { output = m.embeds[0].footer.text.length }
            break;
        case "totallength":
            if (m.embeds[0] == undefined) { output = "undefined" }
            else { output = m.embeds[0].length }

    }


    let final = output
    code = code.replaceLast(`$getFromEmbed[${inside}]`, final)
    return {
        code: code,
    }

}

module.exports = getFromEmbed;