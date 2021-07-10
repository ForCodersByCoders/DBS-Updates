const { docs } = require("../functions/docs/docs.json");
const ytdl = require("ytdl-core");

const trackInfo = async (client, message, args, name, code) => {
    let r = code.split("$trackInfo[").length - 1

    let inside = code.split("$trackInfo[")[r].split("]")[0]

    let [position, song] = inside.split(";")

    if (!client.queue.get(message.guild.id)) return message.channel.send(`:x: Bot is not currently playing audio!\n${docs.music}/trackinfo`)

    let infoo = client.queue.get(message.guild.id)
    
    if (!song) song = 1
    if (isNaN(song)) return message.channel.send(`:x: Not a valid number in 2nd field of \`$trackInfo[${inside}]\`!\n${docs.music}/trackinfo`)
    song = song - 1
    if (song > client.queue.get(message.guild.id).songs.length) return message.channel.send(`:x: Song not available in queue of \`$trackInfo[${inside}]\`!\n${docs.music}/trackinfo`)
    if (song < 0) return message.channel.send(`:x: Song not available in queue of \`$trackInfo[${inside}]\`!\n${docs.music}/trackinfo`)

    let info = await ytdl.getInfo(infoo.songs[song]).catch(err => undefined)
    if (!info) return {
        code: code.replaceLast(`$trackInfo[${inside}]`, 'undefined')
    }


    let totalSeconds = info.videoDetails.lengthSeconds
    let hours = Math.floor(totalSeconds / 3600)
    totalSeconds %= 3600
    let minutes = Math.floor(totalSeconds / 60)
    let seconds = Math.floor(totalSeconds % 60)


    switch (position) {
        case 'title': code = code.replaceLast(`$trackInfo[${inside}]`, info.videoDetails.title)
            break;
        case 'author': code = code.replaceLast(`$trackInfo[${inside}]`, info.videoDetails.author.name)
            break;
        case 'requester': code = code.replaceLast(`$trackInfo[${inside}]`, infoo.request)
            break;
        case 'url': code = code.replaceLast(`$trackInfo[${inside}]`, info.videoDetails.video_url)
            break;
        case 'length': code = code.replaceLast(`$trackInfo[${inside}]`, `${hours}h ${minutes}m ${seconds}s`)
            break;
        case 'thumbnail': code = code.replaceLast(`$trackInfo[${inside}]`, info.videoDetails.thumbnails[0].url)
    }

    return {
        code: code,
    }
}

module.exports = trackInfo;










// const { docs } = require("../functions/docs/docs.json");
// const ytdl = require("ytdl-core")
// const trackInfo = async (client, message, args, name, code) => {

//     let r = code.split("$trackInfo[").length - 1

//     let inside = code.split("$trackInfo[")[r].split("]")[0]

//     let [position, song] = inside.split(";")

//     if (!client.queue.get(message.guild.id)) return message.channel.send(`:x: Bot is not currently playing audio!\n${docs.music}/trackinfo`)

//     let infoo = client.queue.get(message.guild.id)

//     if (!song) song = 1
//     if (isNaN(song)) return message.channel.send(`:x: Not a valid number in 2nd field of \`$trackInfo[${inside}]\`!\n${docs.music}/trackinfo`)
//     song = song - 1
//     if (song > client.queue.get(message.guild.id).songs.length) return message.channel.send(`:x: Song not available in queue of \`$trackInfo[${inside}]\`!\n${docs.music}/trackinfo`)
//     if (song < 0) return message.channel.send(`:x: Song not available in queue of \`$trackInfo[${inside}]\`!\n${docs.music}/trackinfo`)

//     let info = await ytdl.getInfo(infoo.songs[song])
//     let totalSeconds = info.videoDetails.lengthSeconds
//     let hours = Math.floor(totalSeconds / 3600)
//     totalSeconds %= 3600
//     let minutes = Math.floor(totalSeconds / 60)
//     let seconds = Math.floor(totalSeconds % 60)

//     switch (position) {
//         case 'title': code = code.replaceLast(`$trackInfo[${inside}]`, info.videoDetails.title)
//             break;
//         case 'author': code = code.replaceLast(`$trackInfo[${inside}]`, info.videoDetails.author.name)
//             break;
//         case 'requester': code = code.replaceLast(`$trackInfo[${inside}]`, infoo.request[song])
//             break;
//         case 'url': code = code.replaceLast(`$trackInfo[${inside}]`, info.videoDetails.video_url)
//             break;
//         case 'length': code = code.replaceLast(`$trackInfo[${inside}]`, `${hours}h ${minutes}m ${seconds}s`)
//             break;
//         case 'thumbnail': code = code.replaceLast(`$trackInfo[${inside}]`, info.videoDetails.thumbnails[0].url)
//     }

//     return {
//         code: code,
//     }
// }

// module.exports = trackInfo;