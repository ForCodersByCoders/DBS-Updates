const { docs } = require("../functions/docs/docs.json");

const disconnect = async (client, message, args, name, code) => {

    const r = code.split("$disconnect[").length - 1

    let inside = code.split("$disconnect[")[r].split("]")[0]

    if (!inside) return message.channel.send(`:x: Invalid channel ID in \`$disconnect[${inside}]\`.\n${docs.music}/disconnect`)

    let channel = client.channels.cache.get(inside || message.channel.id)

    if (client.queue.get(message.guild.id)) {
        try {
            if (channel !== client.queue.get(message.guild.id).connection.channel)
                return message.channel.send(`:x: ${client.user.tag} is not in that voice channel.\n${docs.music}/disconnect`)
        } catch {
            return message.channel.send(`:x: Something happened when attempting to disconnect....\n${docs.music}/disconnect`)
        }
        client.queue.delete(message.guild.id)
        await channel.leave();
    }


    code = code.replaceLast(`$disconnect[${inside}]`, "")

    return {
        code: code
    }
}
module.exports = disconnect;





// const { docs } = require("../functions/docs/docs.json");

// const disconnect = async (client, message, args, name, code) => {

//     // let channel = client.channels.cache.get(inside || message.channel.id)

//     let queue = client.queue.get(message.guild.id)
//     if (queue) {
//         try {
//             if (!queue.connection.channel)
//                 return message.channel.send(`:x: ${client.user.tag} is not in a voice channel.\n${docs.music}/disconnect`)
//         } catch {
//             return message.channel.send(`:x: Something happened when attempting to disconnect....\n${docs.music}/disconnect`)
//         }
//         client.queue.delete(message.guild.id)
//         await channel.leave();
//     }


//     code = code.replaceLast(`$disconnect`, "")

//     return {
//         code: code
//     }
// }
// module.exports = disconnect;