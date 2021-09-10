const { docs } = require("../functions/docs/docs.json");
const ytdl = require('ytdl-core');

const queue = async (client, message, args, name, code) => {

    let r = code.split("$queue[").length - 1

    let inside = code.split("$queue[")[r].split("]")[0]

    let [custom, startWith, endWith] = inside.split(';')

    if (!client.queue.get(message.guild.id)) return message.channel.send(`:x: Bot is not currently playing audio!\n${docs.music}/queue`)

    let items = client.queue.get(message.guild.id)

    let content = []

    if (!custom) custom = "{position} - {name}"

    if (!startWith) startWith = 0
    if (isNaN(startWith)) startWith = 0

    if (!endWith) endWith = 10
    if (isNaN(endWith)) endWith = 10

    for (let i = startWith; i < (items.songs.length >= endWith ? endWith : items.songs.length); i++) {
        let info = await ytdl.getInfo(items.songs[i])
        let user = await client.users.fetch(items.request[i]).catch(err => { })


        let m = custom.replace(/{request-tag}/gm, user.tag).replace(/{request-name}/gm, user.username).replace(/{request-id}/gm, user.id).replace(/{url}/gm, items.songs[i]).replace(/{name}/gm, info.videoDetails.title).replace(/{position}/gm, parseInt(i) + 1)

        content.push(m)
    }

    code = code.replaceLast(`$queue[${inside}]`, content.join('\n'))

    return {
        code: code,
    }
}

module.exports = queue;