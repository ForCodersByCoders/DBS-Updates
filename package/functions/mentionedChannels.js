const {docs} = require("../functions/docs/docs.json");

const mentionedChannels = (client, message, args, name, code) => {

    let r = code.split("$mentionedChannels[").length - 1

    let inside = code.split("$mentionedChannels[")[r].split("]")[0]

    let [number, us] = inside.split(";")

    if (!us || us !== "yes") us = "no"

    if (isNaN(number) || Number(number) < 1) return message.channel.send(`:x: Invalid mention number in \`$mentionedChannels[${inside}]\`.\n${docs.data}/mentionedchannels`)

    let m = (us === "no" ? "" : message.channel.id)

    if (message.mentions.channels.array()[number - 1]) {
    m = message.mentions.channels.array()[number - 1].id;
    }

    code = code.replaceLast(`$mentionedChannels[${inside}]`, m)

    return {
        code: code
    }
}

module.exports = mentionedChannels;