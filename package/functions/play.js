const { docs } = require("../functions/docs/docs.json");
const ytdl = require('ytdl-core');
const musicEnd = require("./../bot/musicEnd.js")

const play = async (client, message, args, name, code) => {

    if (code.split("$play[").length >= 3) return message.channel.send(`:x: Cant use more than one \`$play\`.\n${docs.music}/play`)

    let r = code.split("$play[").length - 1

    let inside = code.split("$play[")[r].split("]")[0]

    let [link, leave] = inside.split(';')

    let vc = message.member.voice.channel

    if (!vc) return message.channel.send(`:x: Voice channel not found!`)
    if (!leave) leave = 'yes'
    if (leave.includes(['yes', 'no'])) return message.channel.send(`:x: Invalid option in \`$play[${inside}]\`.\n${docs.music}/play`)
    const connection = await vc.join()

    let queueVC = client.queue.get(message.guild.id)
    if (queueVC) {
        queueVC.songs.push(link)
        queueVC.request.push(message.member.id)
    } else {
        const queue = {
            songs: [],
            loop: false,
            queueLoop: false,
            request: [],
            connection: connection
        }
        queue.songs.push(link);
        queue.request.push(message.member.id)
        client.queue.set(message.guild.id, queue)

        function output(guild, opt) {
            let oqueue = client.queue.get(guild)
            const dispatcher = queue.connection.play(ytdl(oqueue.songs[0]))
            dispatcher.on("finish", async () => {
                musicEnd(client)
                let shift1 = queue.songs.shift()
                let shift2 = queue.request.shift()
                if (queue.loop) {
                    queue.songs.unshift(shift1)
                    queue.request.unshift(shift2)
                }
                if (queue.queueLoop) {
                    queue.songs.push(shift1)
                    queue.request.push(shift2)
                }
                if (opt === 'yes' && queue.songs.length <= 0) await vc.leave()

                if (queue.songs.length === 0) return client.queue.delete(message.guild.id)
                output(guild, opt)
            })
        }

        try {
            output(message.guild.id, leave)
        } catch (error) {
            client.queue.delete(message.guild.id);
            await vc.leave();
            return message.channel.send(':x: An unexpected error occured while attempting to play song...')
        }

        connection.on("disconnect", () => {
            client.queue.delete(message.guild.id)
        })
    }

    code = code.replaceLast(`$play[${inside}]`, "")

    return {
        code: code,
    }

}

module.exports = play;