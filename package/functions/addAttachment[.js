const { docs } = require("../functions/docs/docs.json");

const { MessageAttachment } = require('discord.js');

const addAttachment = async (client, message, args, name, code) => {

    if (code.split("$addAttachment[").length >= 3) return message.channel.send(`:x: Can't use more than one \`$addAttachment\`\n${docs.data}/addattachment`)

    let inside = code.split("$addAttachment[")[1].split("]")[0]

    if (!inside) return message.channel.send(`:x: No URL is provided in \`$addAttachment[]\`\n${docs.data}/addattachment`)

    let split = inside.split(';')
    if (!split[1]) split.push('file.jpg')
    client.attachment.set(message.idd, [split[0], split[1]])


    code = code.replaceLast(`$addAttachment[${inside}]`, "")

    return {
        code: code
    }

}

module.exports = addAttachment;


// const {docs} = require("../functions/docs/docs.json");

// const { MessageAttachment } = require('discord.js');

// const addAttachment = async (client, message, args, name, code) => {

// if (code.split("$addAttachment[").length >= 3) return message.channel.send(`:x: Can't use more than one \`$addAttachment\`\n${docs.data}/addattachment`)


// let inside = code.split("$addAttachment[")[1].split("]")[0]

// if(!inside) return message.channel.send(`:x: No URL is provided in \`$addAttachment\`\n${docs.data}/addattachment`)


// client.attachment.set(message.idd, inside)


// code = code.replaceLast(`$addAttachment[${inside}]`, "")

// return {
//         code: code
//     }

// }

// module.exports = addAttachment;